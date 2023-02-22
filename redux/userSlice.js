import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    active: "",
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNjc3MDcwNzk2fQ.fm5EIRl2ZlOMpcaw61SsJ_vIgBvfHWYbEWzNQGRpdkM",
  },
  reducers: {
    setUser: (state, action) => {
      state.active = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      console.log(action.payload);
    },
  },
});

export const { setUser, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
