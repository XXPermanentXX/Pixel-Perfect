import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, BASE_URL, WS_URL } from "./apiConfig";
import { STYLE_LIST } from "./staticDataModel";
import { ProductsItem, Status } from "./types";
import { mapPromptToSettings } from "@/utilities";
import { setHistoryImageData } from "./history/historyData";
import { User } from "./user/types";

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
  generatedImages:Array<{imageUrl:string}>
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
  generatedImages: [],
};

export const generateImage = createAsyncThunk(
  "generate/handleGenerate",
  async (_, { rejectWithValue, dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      const state = getState() as { generate: GenerateState; auth:{ user: { promptRequest: any,userId:string } } };
      const promptRequest = state.auth.user.promptRequest;
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
          setHistoryImageData(response,state.auth.user.userId);
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
    initialGenerateState: (state) => {
      state.loaderText = "";
      state.generatedImages = [];
      state.generateStatus = "idle";
    },
    setPromptRequest(state, action) {
      const prompt = {...action.payload}
      console.log('setPromptRequest',prompt);
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
      })
      .addCase(generateImage.pending, (state) => {
        state.generateStatus = "loading";
      })
      .addCase(generateImage.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.generatedImages = action.payload;
        }
        state.generateStatus = "succeeded";
      })
      .addCase(generateImage.rejected, (state) => {
        state.generateStatus = "failed";
      });
  },
});

export const { initialProductState, updateLoaderText, setPromptRequest, setLocalGenerateSetting } = generateSlice.actions;
export default generateSlice.reducer;
