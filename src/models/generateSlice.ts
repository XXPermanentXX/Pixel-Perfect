import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_KEY, BASE_URL } from "./apiConfig";

const initialState = {
  productsData: [],
  productStatus: "idle",
};

export const getProductData = createAsyncThunk("generate/getProductData", async (_, { rejectWithValue }) => {
  const response = await fetch(BASE_URL + "/products?key=" + API_KEY);
  if (!response.ok) {
    // Reject if the HTTP status is not OK
    return rejectWithValue(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
});


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
      })
  },
});

export const { initialProductState } = generateSlice.actions;
export default generateSlice.reducer;