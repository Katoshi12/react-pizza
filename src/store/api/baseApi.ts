import { PizzaItem } from "../pizza/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL

type GetPizzaParams = {
  currentPage: number;
  category: number;
  sortBy: string;
  order: string;
  search: string;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getPizzas: builder.query<PizzaItem, GetPizzaParams>({
      query: ({currentPage, category, sortBy, order, search}) => ({
        url: '/items',
        params: {
          page: currentPage,
          limit: 4,
          ...(category ? {category} : {}),
          sortBy,
          order,
          ...(search ? {search} : {}),
        },
      })
    }),
  }),
});

export const {useGetPizzasQuery} = baseApi;
