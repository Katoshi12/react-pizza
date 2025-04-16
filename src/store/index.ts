import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter/slice";
import cartSlice from "./cart/slice";
import pizzaSlice from "./pizza/slice";
import { useDispatch } from "react-redux";
import { baseApi } from "./api/baseApi";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzaSlice,

    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
