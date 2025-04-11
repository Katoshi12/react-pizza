import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../index";

export type CartItem = {
  id: number
  title: string
  size: number
  type: string
  price: number
  count: number
  imageUrl: string
}

interface CartSliceInterface {
  totalPrice: number;
  items: CartItem[]
}

const initialState: CartSliceInterface = {
  totalPrice: 0,
  items: [],
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

      state.totalPrice = state.items.reduce((sum, item) => {
        return sum + item.price * item.count;
      }, 0);
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

export const selectCart = (state: RootState) => state.cartSlice
export const selectCartItemById = (id: number) => (state: RootState) => state.cartSlice.items.find(obj => obj.id === id)

export const {
  addItem,
  decrementItem,
  removeItem,
  clearItems
} = cartSlice.actions;

export default cartSlice.reducer;
