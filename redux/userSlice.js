import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    active: "",
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiZXhwIjoxNjc3NTE5NzYxfQ.LRD7eu5iotuDkm6eZTZ1YtNyIE-6WvMtgdgRYHV0Zds",
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
