import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import categoryReducer from "./categorySlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    category: categoryReducer,
    user: userReducer,
  },
});
