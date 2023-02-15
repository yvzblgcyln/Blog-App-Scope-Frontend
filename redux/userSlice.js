import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { active: "" },
  reducers: {
    setUser: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
