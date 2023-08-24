import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./AccountSlice/AccountSlice";
import { themeReducer } from "./ThemeSlice/themeSlice";
const store = configureStore({
  reducer: {
    accountSlice: accountReducer,
    themeSlice: themeReducer,
  },
});

export default store;
