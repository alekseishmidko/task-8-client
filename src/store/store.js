import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./AccountSlice/AccountSlice";
const store = configureStore({
  reducer: {
    accountSlice: accountReducer,
  },
});

export default store;
