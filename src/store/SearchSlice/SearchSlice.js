import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGetSearch = createAsyncThunk(
  "search/fetchGetSearch",
  async (value, thunkAPI) => {
    try {
      const response = await axios.get(`/api/search/reviews?q=${value}`);

      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
const initialState = {
  searchLoading: "loading",
  errors: null,
  message: "",
  searchedReviews: [],
  searchedComments: [],
};

const searchSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET SEARCH
    builder.addCase(fetchGetSearch.pending, (state) => {
      state.searchLoading = "loading";
      state.errors = null;
      state.searchedReviews = [];
      state.searchedComments = [];
    });
    builder.addCase(fetchGetSearch.fulfilled, (state, action) => {
      state.searchLoading = "loaded";
      state.errors = null;
      state.searchedReviews = action.payload.reviews;
      state.searchedComments = action.payload.comments;
    });
    builder.addCase(fetchGetSearch.rejected, (state, action) => {
      state.searchLoading = "error";
      state.errors = action.error.message;
      state.searchedReviews = [];
      state.searchedComments = [];
    });
  },
});
export const searchReducer = searchSlice.reducer;
