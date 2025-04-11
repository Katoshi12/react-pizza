import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export type PizzaItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

enum Status {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface PizzaSliceInterface {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceInterface = {
  items: [],
  status: Status.LOADING,
};

export type FetchData = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: number
}

export const fetchPizza = createAsyncThunk<PizzaItem[], FetchData>(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const {
      sortBy,
      order,
      category,
      search,
      currentPage,
    } = params;

    const {data} = await axios.get<PizzaItem[]>(
      `https://67e5487418194932a58561f5.mockapi.io/items?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }${ search }`
    );

    return data;
  }
);

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizza.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const pizzaSelector = (state: RootState) => state.pizzaSlice;

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
