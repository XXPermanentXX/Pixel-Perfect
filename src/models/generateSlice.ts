import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, BASE_URL, WS_URL } from "./apiConfig";
import { initialPrompt } from "./staticDataModel";
import { ProductsItem, Prompt, Status } from "./types";

interface GenerateState {
  productsData: Array<ProductsItem>; // 根据实际数据结构替换 'any'
  productStatus: Status;
  promptRequest: Prompt; // 你已经定义的 initialPrompt 的类型
}

const initialState: GenerateState = {
  productsData: [],
  productStatus: "idle",
  promptRequest: initialPrompt,
};

export const generateImage = createAsyncThunk(
  "generate/handleGenerate",
  async (_, { rejectWithValue, dispatch, getState }) => {
    return new Promise((resolve, reject) => {
      const state = getState() as { generate: GenerateState };
      const { promptRequest } = state.generate;
      const sendPrompt = {
        ...promptRequest,
        generationSeed: Math.floor(Math.random() * 0xffffffffffffffff),
      };
      const ws = new WebSocket(WS_URL);
      console.log("Connecting to websocket server...");

      ws.onerror = (error) => {
        console.error("Error connecting to websocket server", error);
        setTimeout(() => {
          // dispatch(updateLoaderText("Error connecting to websocket server")); TODO
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
          // setHistoryImageData(imageUrls);  TODO
          resolve(imageUrls);
        } catch (e) {
          // dispatch(updateLoaderText(event.data)); TODO
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

export const { initialProductState } = generateSlice.actions;
export default generateSlice.reducer;
