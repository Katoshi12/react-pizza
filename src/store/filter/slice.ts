import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceInterface, SortItem, SortPropertyEnums } from "./types";


const initialState: FilterSliceInterface = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnums.Rating_DESC,
  }
}

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSortType(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload
    },
    setCurrentPageCount(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceInterface>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    }
  }
})

export const {
  setCategoryId,
  setSortType,
  setSearchValue,
  setCurrentPageCount,
  setFilters
} = filterSlice.actions;

export default filterSlice.reducer;