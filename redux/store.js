import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    category: categoryReducer,
  },
});
