import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./AccountSlice/AccountSlice";
import { themeReducer } from "./ThemeSlice/themeSlice";
import { ReviewsReducer } from "./ReviewsSlice/ReviewsSlice";
import { productReducer } from "./ProductSlice/ProductSlice";
import { commentReducer } from "./CommentsSlice/CommentsSlice";
import { searchReducer } from "./SearchSlice/SearchSlice";
const store = configureStore({
  reducer: {
    accountSlice: accountReducer,
    themeSlice: themeReducer,
    reviewsSlice: ReviewsReducer,
    productsSlice: productReducer,
    commentsSlice: commentReducer,
    searchSlice: searchReducer,
  },
});

export default store;
