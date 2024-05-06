// reducers/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product._id === product._id
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
          items: [...state.items, { product, quantity: 1 }],
        };
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload.productId
      );
    },
    incrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const { productId } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    setQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
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
  setQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
