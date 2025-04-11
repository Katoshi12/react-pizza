import { RootState } from "../index";

export const filterSelector = (state: RootState) => state.filterSlice
export const selectorSort = (state: RootState) => state.filterSlice.sort