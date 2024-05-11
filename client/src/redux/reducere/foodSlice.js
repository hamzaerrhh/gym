// reducers/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { food } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.food._id === food._id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { food, quantity: 1 }],
        };
      }
    },

    removeItem: (state, action) => {
      const productIdToRemove = action.payload;
      state.items = state.items.filter(
        (item) => item.food._id !== productIdToRemove
      );
    },

    incrementQuantity: (state, action) => {
      const id = action.payload;
      console.log("the id", id);
      const existingItem = state.items.find((item) => item.food._id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find(
        (item) => item.food._id === productId
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = foodSlice.actions;

export default foodSlice.reducer;
