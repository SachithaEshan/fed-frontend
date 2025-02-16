import { createSlice } from "@reduxjs/toolkit";

const savedItemsSlice = createSlice({
  name: "savedItems",
  initialState: {
    value: [],
  },
  reducers: {
    toggleSavedItem: (state, action) => {
      const itemIndex = state.value.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.value.splice(itemIndex, 1);
      } else {
        state.value.push(action.payload);
      }
    },
  },
});

export const { toggleSavedItem } = savedItemsSlice.actions;
export default savedItemsSlice.reducer; 