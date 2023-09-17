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
  "comment/fetchCreateComment",
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
export const fetchHandleLike = createAsyncThunk(
  "likes/fetchHandleLike",
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(`api/likes/${id}`);
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
export const fetchLikesCount = createAsyncThunk(
  "likes/fetchLikesCount",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`api/likes/${id}`);
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
export const fetchGetAllLikes = createAsyncThunk(
  "likes/fetchGetAllLikes",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`api/likes/all`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  commentsLoading: "loading",
  likesLoading: "loading",
  errors: null,
  message: "",
  reviewComments: [],
  allLikes: [],
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
    // POST HANDLE LIKE
    builder.addCase(fetchHandleLike.pending, (state) => {
      state.likesLoading = "loading";
      state.errors = null;
    });
    builder.addCase(fetchHandleLike.fulfilled, (state, action) => {
      state.likesLoading = "loaded";
      state.errors = null;
      state.message = action.payload;
    });
    builder.addCase(fetchHandleLike.rejected, (state, action) => {
      state.likesLoading = "error";
      state.errors = action.error.message;
      //   state.message = action.payload.message;
    });
    // GET ALL LIKES
    builder.addCase(fetchGetAllLikes.pending, (state) => {
      state.likesLoading = "loading";
      state.errors = null;
      state.allLikes = [];
    });
    builder.addCase(fetchGetAllLikes.fulfilled, (state, action) => {
      state.likesLoading = "loaded";
      state.errors = null;
      state.allLikes = action.payload;
    });
    builder.addCase(fetchGetAllLikes.rejected, (state, action) => {
      state.likesLoading = "error";
      state.errors = action.error.message;
      state.allLikes = [];
    });
  },
});
export const commentReducer = commentSlice.reducer;
