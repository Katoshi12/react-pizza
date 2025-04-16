import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaItem, PizzaSliceInterface, Status } from "./types";

const initialState: PizzaSliceInterface = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },

});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
