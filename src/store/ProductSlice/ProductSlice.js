import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGetAllProducts = createAsyncThunk(
  "product/fetchGetAllProducts",
  async (thunkAPI) => {
    try {
      const response = await axios.get("api/products/all");

      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);

const initialState = {
  isLoading: "loading",
  errors: null,
  message: "",
  allProducts: [],
};
const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login POST
    builder.addCase(fetchGetAllProducts.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      state.allProducts = [];
    });
    builder.addCase(fetchGetAllProducts.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      state.allProducts = action.payload.productsWithAvgRatingFive;
    });
    builder.addCase(fetchGetAllProducts.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.error.message;
      state.allProducts = [];
      state.message = action.payload.message;
    });
  },
});
export const productReducer = productSlice.reducer;
