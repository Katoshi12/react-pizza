import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: 'loading'
};

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const {
      sortBy,
      order,
      category,
      search,
      currentPage,
    } = params;
    const {data} = await axios.get(
      `https://67e5487418194932a58561f5.mockapi.io/items?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }${ search }`
    );

    return data;
  }
);


const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
