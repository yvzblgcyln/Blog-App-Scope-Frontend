import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    filter: "",
    categories: ["Technology", "Finance", "Photo", "Art", "Sport"],
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
export const { setFilter } = categorySlice.actions;
export default categorySlice.reducer;
