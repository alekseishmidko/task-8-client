import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGetAllReviews = createAsyncThunk(
  "api/reviews/all",
  async (thunkAPI) => {
    try {
      const response = await axios.get("api/reviews/all", {});
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchGetMyReviews = createAsyncThunk(
  "api/reviews/user/myReviews",
  async (thunkAPI) => {
    try {
      const response = await axios.get("api/reviews/user/myReviews");
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchGetOneReview = createAsyncThunk(
  "api/reviews/:id",
  async ({ id }, thunkAPI) => {
    try {
      const response = await axios.get(`api/reviews/${id}`);
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchUpdateReview = createAsyncThunk(
  "api/reviews/:id2",
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await axios.put(`api/reviews/${id}`, values);
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchDeleteReview = createAsyncThunk(
  "api/reviews/:id3",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`api/reviews/${id}`);
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: null,
  allReviews: [],
  last6Reviews: [],
  pop6Reviews: [],
  myReviews: [],
  oneReview: [],
  isLoading: "loading",
  errors: null,
  message: "",
};

const ReviewsSlice = createSlice({
  name: "ReviewsSlice",
  initialState,
  extraReducers: (builder) => {
    // GET ALL REVIEWS
    builder.addCase(fetchGetAllReviews.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      state.data = {};
      state.allReviews = [];
      state.last6Reviews = [];
      state.pop6Reviews = [];
    });

    builder.addCase(fetchGetAllReviews.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = "loaded";
      state.errors = null;
      state.data = action.payload;
      state.allReviews = action.payload.allReviews;
      state.last6Reviews = action.payload.last6Reviews;
      state.pop6Reviews = action.payload.pop6Reviews;
    });
    builder.addCase(fetchGetAllReviews.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.payload;
      state.message = action.payload;
      state.data = {};
      state.allReviews = [];
      state.last6Reviews = [];
      state.pop6Reviews = [];
    });
    // GET MY REVIEWS
    builder.addCase(fetchGetMyReviews.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      state.myReviews = [];
    });

    builder.addCase(fetchGetMyReviews.fulfilled, (state, action) => {
      // state.data = action.payload;
      state.isLoading = "loaded";
      state.errors = null;
      state.myReviews = action.payload;
    });
    builder.addCase(fetchGetMyReviews.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.payload;
      state.message = action.payload;
      state.myReviews = [];
    });
    // GET ONE REVIEW
    builder.addCase(fetchGetOneReview.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      state.oneReview = [];
    });

    builder.addCase(fetchGetOneReview.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      state.oneReview = action.payload.review;
    });
    builder.addCase(fetchGetOneReview.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.payload;
      state.message = action.payload;
      state.oneReview = [];
    });
    // PUT UPDATE REVIEW
    builder.addCase(fetchUpdateReview.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      // state.oneReview = [];
    });

    builder.addCase(fetchUpdateReview.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      // state.oneReview = action.payload.review;
    });
    builder.addCase(fetchUpdateReview.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.payload;
      state.message = action.payload;
      // state.oneReview = [];
    });
    // DELETE REVIEW
    builder.addCase(fetchDeleteReview.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      // state.oneReview = [];
    });

    builder.addCase(fetchDeleteReview.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      // state.oneReview = action.payload.review;
    });
    builder.addCase(fetchDeleteReview.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.payload;
      state.message = action.payload;
      // state.oneReview = [];
    });
  },
});
export const ReviewsReducer = ReviewsSlice.reducer;
