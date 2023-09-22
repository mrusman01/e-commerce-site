import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const productSlice = createSlice({
  name: "ADD_CART",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const findItem = state.items.find((item) => item._id === action.payload);
      if (findItem) {
        findItem.qunatity++;
      } else {
        state.items.push({ ...action.payload, qunatity: 1 });
      }
    },
    remove: (state, action) => {
      const removeItem = state.items.filter(
        (item) => item._id !== action.payload
      );
      state.items = removeItem;
    },
  },
});

export const { addCart, remove } = productSlice.actions;

export default productSlice.reducer;
