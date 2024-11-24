import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Example data structure to hold CRUD items
};

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // Create
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    // Read (use a selector for reading state)
    readItems(state) {
      // Reading items is implicit, as the state holds them
      return state.items;
    },
    // Update
    updateItem: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...newData };
      }
    },
    // Delete
    deleteItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
});

export const { addItem,readItems, updateItem, deleteItem } = itemSlice.actions;

export default itemSlice.reducer;
