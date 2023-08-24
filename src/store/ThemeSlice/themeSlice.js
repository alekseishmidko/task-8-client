import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  themeMode: true,
};
const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    handleTheme: (state) => {
      state.themeMode = !state.themeMode;
    },
  },
});
export const themeReducer = themeSlice.reducer;
export const { handleTheme } = themeSlice.actions;
