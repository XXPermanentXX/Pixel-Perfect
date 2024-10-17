import { createSlice } from "@reduxjs/toolkit";
import { GeneratedImage } from "./types";

const initialState: { historyImages: GeneratedImage[] } = {
  historyImages: [],
};

const projectHistorySlice = createSlice({
  name: "projectHistory",
  initialState,
  reducers: {
    // Add an image to the project history
    setHistoryImages: (state, action) => {
      state.historyImages = action.payload;
    },
    // Remove an image from the project history
    removeImage: (state, action) => {
      state.historyImages = state.historyImages.filter(
        (image) => image.id !== action.payload
      );
    },
  },
});

export const { setHistoryImages, removeImage } = projectHistorySlice.actions;
export default projectHistorySlice.reducer;
