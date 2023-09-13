import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGetAllProducts = createAsyncThunk(
  "product/fetchGetAllProducts",
  async ({ parameters }, thunkAPI) => {
    try {
      const response = await axios.get(`api/products/all?sortBy=${parameters}`);

      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
export const fetchGetOneProduct = createAsyncThunk(
  "product/fetchGetOneProduct",
  async (parameters, thunkAPI) => {
    try {
      console.log(parameters);
      const response = await axios.get(`api${parameters}`);

      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
export const fetchHandleProductsRating = createAsyncThunk(
  "product/fetchHandleProductsRating",
  async ({ id, value }, thunkAPI) => {
    try {
      const response = await axios.post(`api/products/${id}`, {
        ratingFive: value,
      });
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
export const fetchCreateProduct = createAsyncThunk(
  "review/fetchCreateProduct",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`api/products/create`, values);
      console.log(response);
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
  productsRatings: [],
  oneProduct: [],
  oneProductLoading: "loading",
  allProductsLoading: "loading",

  averageRatingFive: 0,
};
const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL PRODUCTS
    builder.addCase(fetchGetAllProducts.pending, (state) => {
      state.isLoading = "loading";
      (state.allProductsLoading = "loading"), (state.errors = null);
      state.allProducts = [];
      state.productsRatings = [];
    });
    builder.addCase(fetchGetAllProducts.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.allProductsLoading = "loaded";
      state.errors = null;
      state.allProducts = action.payload.productsWithAvgRatingFive;
      state.productsRatings = action.payload.productsRatings;
    });
    builder.addCase(fetchGetAllProducts.rejected, (state, action) => {
      state.isLoading = "error";
      state.allProductsLoading = "error";
      state.errors = action.error.message;
      state.allProducts = [];
      state.productsRatings = [];
      state.message = action.payload;
    });
    // GET ONE PRODUCT
    builder.addCase(fetchGetOneProduct.pending, (state) => {
      state.oneProductLoading = "loading";
      state.errors = null;
      state.oneProduct = [];
      state.averageRatingFive = 0;
      state.productsRatings = [];
    });
    builder.addCase(fetchGetOneProduct.fulfilled, (state, action) => {
      state.oneProductLoading = "loaded";
      state.errors = null;
      state.oneProduct = action.payload.product;
      state.averageRatingFive = action.payload.averageRatingFive;
      state.productsRatings = action.payload.productsRatings;
    });
    builder.addCase(fetchGetOneProduct.rejected, (state, action) => {
      state.oneProductLoading = "error";
      state.errors = action.error.message;
      state.oneProduct = [];
      state.averageRatingFive = 0;
      state.productsRatings = [];
      // state.message = action.payload;
    });
    // POST HANDLE RATING FIVE
    builder.addCase(fetchHandleProductsRating.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
    });
    builder.addCase(fetchHandleProductsRating.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
    });
    builder.addCase(fetchHandleProductsRating.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.error.message;
      state.message = action.payload.message;
    });
    // POST CREATE PRODUCT
    builder.addCase(fetchCreateProduct.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
    });
    builder.addCase(fetchCreateProduct.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
    });
    builder.addCase(fetchCreateProduct.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.error.message;
      state.message = action.payload.message;
    });
  },
});
export const productReducer = productSlice.reducer;
