import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Load saved items from localStorage with user-specific key
const loadSavedItems = () => {
  try {
    const userId = window.Clerk?.user?.id;
    // Only load items if user is logged in
    if (!userId) return [];
    const key = `savedItems_${userId}`;
    const savedItems = localStorage.getItem(key);
    return savedItems ? JSON.parse(savedItems) : [];
  } catch (error) {
    console.error('Error loading saved items:', error);
    return [];
  }
};

// Async thunk for saving item to database
export const saveItemToDb = createAsyncThunk(
  'savedItems/saveToDb',
  async (item) => {
    const response = await fetch('https://fed-storefront-backend-sachitha.onrender.com/Api/savedItems', {
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

// Async thunk for removing item from database
export const removeItemFromDb = createAsyncThunk(
  'savedItems/removeFromDb',
  async (itemId) => {
    const response = await fetch(`https://fed-storefront-backend-sachitha.onrender.com/Api/savedItems/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${await window.Clerk?.session?.getToken()}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to remove item');
    return itemId;
  }
);

// Async thunk for fetching saved items
export const fetchSavedItems = createAsyncThunk(
  'savedItems/fetchFromDb',
  async () => {
    const response = await fetch('https://fed-storefront-backend-sachitha.onrender.com/Api/savedItems', {
      headers: {
        'Authorization': `Bearer ${await window.Clerk?.session?.getToken()}`
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch saved items');
    return await response.json();
  }
);

export const initializeUserSavedItems = createAsyncThunk(
  'savedItems/initialize',
  async (_, { dispatch }) => {
    try {
      await dispatch(fetchSavedItems()).unwrap();
    } catch (error) {
      console.error('Failed to initialize saved items:', error);
    }
  }
);

const savedItemsSlice = createSlice({
  name: "savedItems",
  initialState: {
    value: [],
    status: 'idle',
    error: null
  },
  reducers: {
    toggleSavedItem: (state, action) => {
      const userId = window.Clerk?.user?.id;
      if (!userId) return;

      const itemIndex = state.value.findIndex(item => item._id === action.payload._id);
      if (itemIndex >= 0) {
        state.value.splice(itemIndex, 1);
      } else {
        const { _id, name, price, description, image, inventory } = action.payload;
        state.value.push({
          _id,
          name,
          price,
          description,
          image,
          inventory: inventory || 0,
        });
      }
    },
    clearSavedItems: (state) => {
      state.value = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSavedItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchSavedItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveItemToDb.fulfilled, (state, action) => {
        //console.log('Item saved successfully:', action.payload);
      })
      .addCase(removeItemFromDb.fulfilled, (state, action) => {
        //console.log('Item removed successfully:', action.payload);
      });
  }
});

export const { toggleSavedItem, clearSavedItems } = savedItemsSlice.actions;
export default savedItemsSlice.reducer; 