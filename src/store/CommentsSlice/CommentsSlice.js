import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchGetReviewComments = createAsyncThunk(
  "product/fetchGetReviewComments",
  async (id, thunkAPI) => {
    try {
      console.log(id);
      const response = await axios.get(`api/comments/${id}`);

      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);

export const fetchCreateComment = createAsyncThunk(
  "review/fetchCreateComment",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`api/comments/`, formData);
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
  commentsLoading: "loading",
  errors: null,
  message: "",
  reviewComments: [],
};
const commentSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL REVIEW COMMENTS
    builder.addCase(fetchGetReviewComments.pending, (state) => {
      state.commentsLoading = "loading";
      state.errors = null;
      state.reviewComments = [];
    });
    builder.addCase(fetchGetReviewComments.fulfilled, (state, action) => {
      state.commentsLoading = "loaded";
      state.errors = null;
      state.reviewComments = action.payload.reviewComments;
    });
    builder.addCase(fetchGetReviewComments.rejected, (state, action) => {
      state.commentsLoading = "error";
      state.errors = action.error.message;
      state.reviewComments = [];
    });

    // POST CREATE COMMENT
    builder.addCase(fetchCreateComment.pending, (state) => {
      state.commentsLoading = "loading";
      state.errors = null;
    });
    builder.addCase(fetchCreateComment.fulfilled, (state, action) => {
      state.commentsLoading = "loaded";
      state.errors = null;
    });
    builder.addCase(fetchCreateComment.rejected, (state, action) => {
      state.commentsLoading = "error";
      state.errors = action.error.message;
      //   state.message = action.payload.message;
    });
  },
});
export const commentReducer = commentSlice.reducer;
