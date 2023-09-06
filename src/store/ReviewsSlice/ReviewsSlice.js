import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGetAllReviews = createAsyncThunk(
  "api/reviews/all",
  async ({ parameters }, thunkAPI) => {
    try {
      const response = await axios.get(`api/reviews/all?sortBy=${parameters}`);
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchGetMyReviews = createAsyncThunk(
  "api/reviews/users/myReviews",
  async (thunkAPI) => {
    try {
      const response = await axios.get("api/reviews/users/myReviews");
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchGetOneReview = createAsyncThunk(
  "api/reviews/:fetchGetOneReview",
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
  "api/reviews/:fetchUpdateReview",
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
  "api/reviews/:fetchDeleteReview",
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
export const fetchHandleReviewsRating = createAsyncThunk(
  "review/fetchHandleReviewsRating",
  async ({ id, value }, thunkAPI) => {
    try {
      const response = await axios.post(`api/reviews/${id}`, {
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
export const fetchCreateReview = createAsyncThunk(
  "review/fetchCreateReview",
  async (values, thunkAPI) => {
    try {
      const response = await axios.post(`api/reviews/create`, values);
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
  data: null,
  allUnicTags: [],
  allReviews: [],
  last6Reviews: [],
  pop6Reviews: [],
  myReviews: [],
  oneReview: [],
  averageRatingFive: 0,
  isLoading: "loading",
  errors: null,
  message: "",
  reviewsRatings: [],
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
      state.allUnicTags = [];
      state.allReviews = [];
      state.last6Reviews = [];
      state.pop6Reviews = [];
      state.reviewsRatings = [];
    });

    builder.addCase(fetchGetAllReviews.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = "loaded";
      state.errors = null;
      state.data = action.payload;
      state.allUnicTags = action.payload.allUnicTags;
      state.allReviews = action.payload.allReviews;
      state.last6Reviews = action.payload.last6Reviews;
      state.pop6Reviews = action.payload.pop6Reviews;
      state.reviewsRatings = action.payload.reviewsRatings;
    });
    builder.addCase(fetchGetAllReviews.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.payload;
      state.message = action.payload;
      state.data = {};
      state.allUnicTags = [];
      state.allReviews = [];
      state.last6Reviews = [];
      state.pop6Reviews = [];
      state.reviewsRatings = [];
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
      state.averageRatingFive = 0;
    });

    builder.addCase(fetchGetOneReview.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      state.oneReview = action.payload.review;
      state.averageRatingFive = action.payload.averageRatingFive;
    });
    builder.addCase(fetchGetOneReview.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.payload;
      state.message = action.payload;
      state.averageRatingFive = action.payload.averageRatingFive;
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
    // POST CREATE REVIEW
    builder.addCase(fetchCreateReview.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      // state.oneReview = [];
    });

    builder.addCase(fetchCreateReview.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      // state.oneReview = action.payload.review;
    });
    builder.addCase(fetchCreateReview.rejected, (state, action) => {
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
