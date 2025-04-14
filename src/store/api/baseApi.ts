import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetPizzaParams = {
  currentPage: number;
  category: string;
  sortBy: string;
  order: string;
  search: string;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://67e5487418194932a58561f5.mockapi.io",
  }),
  endpoints: (builder) => ({
    getPizzas: builder.query<any, GetPizzaParams>({
      query: ({currentPage, category, sortBy, order, search}) =>
        `/items?page=${ currentPage }&limit=4&${ category }&sortBy=${ sortBy }&order=${ order }${ search }`,
    }),
  }),
});

export const {useGetPizzasQuery} = baseApi;
