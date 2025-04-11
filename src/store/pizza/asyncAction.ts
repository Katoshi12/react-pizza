import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchData, PizzaItem } from "./types";
import axios from "axios";

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
