import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async (test) => {
  const data = await fetch(test.url, {
    method: "GET",
    headers: { "x-access-token": test.accessToken },
  }).then((res) => res.json());
  return data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], page: 0, pageCount: 0 },
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload.Data;
    },
    addPost: (state, { payload }) => {
      state.posts.push(payload);
    },
    removePost: (state, action) => {
      state.posts.filter((Id) => Id !== action.payload);
    },
    updatePost: (state, action) => {
      state.posts.splice(action.payload.id, 1);
      state.posts.splice(action.payload.id, 1, action.payload.updatedPost);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.posts = action.payload.Data;
      state.pageCount = Math.ceil(action.payload.Data?.length / 5);
    });
  },
});

export const { setPosts, addPost, removePost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
