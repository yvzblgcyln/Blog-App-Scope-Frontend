import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    filter: "",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
export const { setFilter } = categorySlice.actions;
export default categorySlice.reducer;
