import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    active: "",
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNjc3NTg5MzY1fQ.9IcuEiLNtZA75mcA0fGjWxR18wwKrA30nLTIk4qT3c8",
  },
  reducers: {
    setUser: (state, action) => {
      state.active = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
