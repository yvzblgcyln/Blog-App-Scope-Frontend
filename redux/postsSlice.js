import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`).then((res) => res.json());
  return data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], page: 0 },
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts.push(payload);
    },
    removePost: (state, action) => {
      state.posts.splice(action.payload, 1);
    },
    updatePost: (state, action) => {
      state.posts.splice(action.payload.id, 1);
      state.posts.splice(action.payload.id, 1, action.payload.updatedPost);
      console.log(state.posts);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      for (let i = 0; i < action.payload.length; i++) state.posts[i] = action.payload[i];
    });
  },
});

export const { setPosts, addPost, removePost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
