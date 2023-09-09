import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./AccountSlice/AccountSlice";
import { themeReducer } from "./ThemeSlice/themeSlice";
import { ReviewsReducer } from "./ReviewsSlice/ReviewsSlice";
import { productReducer } from "./ProductSlice/ProductSlice";
import { commentReducer } from "./CommentsSlice/CommentsSlice";
const store = configureStore({
  reducer: {
    accountSlice: accountReducer,
    themeSlice: themeReducer,
    reviewsSlice: ReviewsReducer,
    productsSlice: productReducer,
    commentsSlice: commentReducer,
  },
});

export default store;
