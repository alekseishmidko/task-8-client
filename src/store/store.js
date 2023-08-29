import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./AccountSlice/AccountSlice";
import { themeReducer } from "./ThemeSlice/themeSlice";
import { ReviewsReducer } from "./ReviewsSlice/ReviewsSlice";
const store = configureStore({
  reducer: {
    accountSlice: accountReducer,
    themeSlice: themeReducer,
    reviewsSlice: ReviewsReducer,
  },
});

export default store;
