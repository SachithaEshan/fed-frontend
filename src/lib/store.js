import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import cartReducer from "./features/cartSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import savedItemsReducer from "./features/savedItemsSlice";


import { Api } from "./api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    [Api.reducerPath]: Api.reducer,
    savedItems: savedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

setupListeners(store.dispatch);

export const fetchProducts = async () => {
  const response = await fetch("https://fed-storefront-backend-sachitha.onrender.com/Api/products");
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch("https://fed-storefront-backend-sachitha.onrender.com/Api/categories");
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
};
