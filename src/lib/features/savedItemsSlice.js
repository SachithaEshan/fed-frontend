import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load saved items from localStorage
const loadSavedItems = () => {
  try {
    const savedItems = localStorage.getItem('savedItems');
    return savedItems ? JSON.parse(savedItems) : [];
  } catch (error) {
    console.error('Error loading saved items:', error);
    return [];
  }
};

// Async thunk for saving item
export const saveItemToDb = createAsyncThunk(
  'savedItems/saveToDb',
  async (item, { getState }) => {
    const response = await fetch('http://localhost:8000/Api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await window.Clerk?.session?.getToken()}`
      },
      body: JSON.stringify(item)
    });
    
    if (!response.ok) throw new Error('Failed to save item');
    return await response.json();
  }
);

const savedItemsSlice = createSlice({
  name: "savedItems",
  initialState: {
    value: loadSavedItems(),
  },
  reducers: {
    toggleSavedItem: (state, action) => {
      const itemIndex = state.value.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.value.splice(itemIndex, 1);
      } else {
        const { _id, name, price, description, image, stock, inventory } = action.payload;
        state.value.push({
          _id,
          name,
          price,
          description,
          image,
          stock: stock || inventory || 0,
        });
      }
      localStorage.setItem('savedItems', JSON.stringify(state.value));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveItemToDb.fulfilled, (state, action) => {
      // Handle successful save to database
      console.log('Item saved to database:', action.payload);
    });
  }
});

export const { toggleSavedItem } = savedItemsSlice.actions;
export default savedItemsSlice.reducer; 