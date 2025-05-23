import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItem, CartSliceInterface } from "./types";

const {items, totalPrice} = getCartFromLS()

const initialState: CartSliceInterface = {
  totalPrice: totalPrice,
  items: items,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(item => item.id === action.payload.id)

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items)
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(item => item.id === action.payload)

      if (findItem) {
        findItem.count--;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  }
})

export const {
  addItem,
  decrementItem,
  removeItem,
  clearItems
} = cartSlice.actions;

export default cartSlice.reducer;
