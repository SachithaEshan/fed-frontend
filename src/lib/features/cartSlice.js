import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(state.value);
      const product = action.payload;

      const foundItem = state.value.find(
        (item) => item.product._id === product._id
      );
      if (foundItem) {
        foundItem.quantity += 1;
        return;
      }
      state.value.push({ product: action.payload, quantity: 1 });
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      console.log(state.value);
      state.value = state.value.filter(item => item.product._id !== itemId);
    },
    clearCart:(state)=>{
      state.value = [];
    },
    incrementQuantity: (state, action) => {
      const item = state.value.find(item => item.product._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.value.find(item => item.product._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;