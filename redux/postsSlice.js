import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    postsArray: [],
  },
  reducers: {
    setPosts: (state, { payload }) => {
      for (let i = 0; i < payload.length; i++) {
        state[i] = payload[i];
        //console.log(payload[i], state[i]);
      }
    },
  },
});

export const { setPosts } = postsSlice.actions;
export default postsSlice.reducer;
