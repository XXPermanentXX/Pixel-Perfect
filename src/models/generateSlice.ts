import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, BASE_URL, WS_URL } from "./apiConfig";
import { INITIAL_PROMPT, STYLE_LIST } from "./staticDataModel";
import { ProductsItem, Prompt, Status } from "./types";
import { mapPromptToSettings } from "@/utilities";
import { setHistoryImageData } from "./history/historyData";
import { User } from "./user/types";
import { updateUserData } from "./user/authSlice";
// import { setHistoryImageData } from "./firebaseModel";

interface GenerateState {
  loaderText: string;
  productsData: Array<ProductsItem>;
  productStatus: Status;
  generateStatus: Status;
  generateSettings: {
    productModel: string;
    promptText: string;
    imageStyle: string;
    aspectRatio: string;
  }
}

const initialState: GenerateState = {
  loaderText: "",
  productsData: [],
  productStatus: "idle",
  generateStatus: "idle",
  generateSettings: {
    productModel: "",
    promptText: "",
    imageStyle: "",
    aspectRatio: "",
  },
};

export const generateImage = createAsyncThunk(
  "generate/handleGenerate",
  async (_, { rejectWithValue, dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      const state = getState() as { generate: GenerateState; user: User };
      const promptRequest = state.user.promptRequest;
      const sendPrompt = {
        ...promptRequest,
        generationSeed: Math.floor(Math.random() * 0xffffffffffffffff),
      };
      const ws = new WebSocket(WS_URL);
      console.log("Connecting to websocket server...");

      ws.onerror = (error) => {
        console.error("Error connecting to websocket server", error);
        setTimeout(() => {
          dispatch(updateLoaderText("Error connecting to websocket server"));
          reject(rejectWithValue("Error connecting to websocket server"));
        }, 1000);
      };

      ws.onopen = () => {
        console.log("Connected to websocket server");
        console.log(`Sending payload: ${JSON.stringify(sendPrompt)}`);
        ws.send(JSON.stringify(sendPrompt));
      };

      ws.onmessage = (event) => {
        try {
          console.log(`Message received: ${event.data}`);
          const response = JSON.parse(event.data);
          const imageUrls = response.map((image: any) => ({ imageUrl: image }));
          // setHistoryImageData(imageUrls);
          resolve(imageUrls);
        } catch (e) {
          dispatch(updateLoaderText(event.data));
        }
      };
    });
  }
);

export const getProductData = createAsyncThunk(
  "generate/getProductData",
  async (_, { rejectWithValue }) => {
    const response = await fetch(BASE_URL + "/products?key=" + API_KEY);
    if (!response.ok) {
      // Reject if the HTTP status is not OK
      return rejectWithValue(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
);



const generateSlice = createSlice({
  name: "generate",
  initialState,
  reducers: {
    initialProductState: (state) => {
      state.productsData = [];
      state.productStatus = "idle";
    },
    setPromptRequest(state, action) {
      const prompt = {...action.payload}
      state.generateSettings = mapPromptToSettings(prompt, state.productsData, STYLE_LIST);
      console.log("generateSettings: ", mapPromptToSettings(prompt, state.productsData, STYLE_LIST));
    },
    setLocalGenerateSetting: (state, action) => {
      state.generateSettings = {
        ...state.generateSettings,
        ...action.payload,
      };
    },
    updateLoaderText: (state, action) => {
      state.loaderText = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      //getProductData
      .addCase(getProductData.pending, (state) => {
        state.productStatus = "loading";
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        state.productsData = action.payload;
        state.productStatus = "succeeded";
      })
      .addCase(getProductData.rejected, (state) => {
        state.productStatus = "failed";
      });
  },
});

export const { initialProductState, updateLoaderText, setPromptRequest, setLocalGenerateSetting } = generateSlice.actions;
export default generateSlice.reducer;
