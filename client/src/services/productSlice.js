import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const savedItems = JSON.parse(localStorage.getItem("items")) || [];

export const productSlice = createSlice({
  name: "ADD_CART",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.items.push(action.payload);
      const stringifyObj = JSON.stringify(state.items);
      localStorage.setItem("items", stringifyObj);
    },
    remove: (state, action) => {
      state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("items", JSON.stringify(savedItems));
    },
  },
});

export const { addCart, remove } = productSlice.actions;

export default productSlice.reducer;
