import { RootState } from "../index";

export const selectCart = (state: RootState) => state.cartSlice
export const selectCartItemById = (id: number) => (state: RootState) => state.cartSlice.items.find(obj => obj.id === id)
