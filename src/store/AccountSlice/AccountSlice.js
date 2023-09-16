import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import { StorageKeys } from "../../consts/storageKeys";

export const fetchLogin = createAsyncThunk(
  "api/users/signIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post("api/users/signIn", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchCurrent = createAsyncThunk(
  "api/users/current",
  async (thunkAPI) => {
    try {
      const response = await axios.get("api/users/current");

      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.response.data);
      return error;
    }
  }
);

export const fetchRegistration = createAsyncThunk(
  "account/fetchRegistration",
  async ({ email, password, name }, thunkAPI) => {
    try {
      const response = await axios.post("api/users/signUp", {
        email,
        password,
        name,
      });

      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
export const fetchGetAllUsers = createAsyncThunk(
  "account/fetchGetAllUsers",
  async (thunkAPI) => {
    try {
      const response = await axios.get("api/users/all");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
export const fetchDeleteUser = createAsyncThunk(
  "api/users/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`api/users/${id}`);
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const fetchHandleRoleUser = createAsyncThunk(
  "api/users/handle",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`api/users/${id}`);
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchGetLikes = createAsyncThunk(
  "account/fetchGetLikes",
  async (thunkAPI) => {
    try {
      const response = await axios.get("api/likes");
      return response.data;
    } catch (error) {
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);

export const fetchSignGoogle = createAsyncThunk(
  "account/fetchSignGoogle",
  async ({ email, id, picture, verified_email, name }, thunkAPI) => {
    try {
      const response = await axios.post("api/users/google", {
        email,
        id,
        picture,
        verified_email,
        name,
      });
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const initialState = {
  data: null,
  authLoading: "loading",
  isLoading: "loading",
  errors: null,
  message: "",
  allUsers: [],
  userLikes: 0,
};
const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.errors = null;
      localStorage.removeItem(StorageKeys.TOKEN);
    },
  },
  extraReducers: (builder) => {
    // Login POST
    builder.addCase(fetchLogin.pending, (state) => {
      state.authLoading = "loading";
      state.errors = null;
      state.data = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.authLoading = "loaded";
      state.errors = null;
      state.data = action.payload.user;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.authLoading = "error";
      state.errors = action.error.message;
      state.data = null;
      state.message = action.payload.message;
    });
    // GET CURRENT
    builder.addCase(fetchCurrent.pending, (state) => {
      state.authLoading = "loading";
      state.errors = null;
      state.data = null;
    });
    builder.addCase(fetchCurrent.fulfilled, (state, action) => {
      state.authLoading = "loaded";
      state.errors = null;
      state.data = action.payload.user;
    });
    builder.addCase(fetchCurrent.rejected, (state, action) => {
      state.authLoading = "error";
      state.errors = action.error.message;
      state.data = null;
      // state.message = action.payload.message;
    });
    // Registration POST
    builder.addCase(fetchRegistration.pending, (state) => {
      state.authLoading = "loading";
      state.errors = null;
      state.data = null;
    });
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.authLoading = "loaded";
      state.errors = null;
      state.data = action.payload.user;
    });
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.authLoading = "error";
      state.errors = action.error.message;
      state.data = null;
      state.message = action.payload.message;
    });
    // GET ALL USERS
    builder.addCase(fetchGetAllUsers.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      state.allUsers = [];
    });
    builder.addCase(fetchGetAllUsers.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      state.allUsers = action.payload.allUsers;
    });
    builder.addCase(fetchGetAllUsers.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.error.message;
      state.allUsers = null;
      state.message = action.payload.message;
    });
    // DELETE USER
    builder.addCase(fetchDeleteUser.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
    });
    builder.addCase(fetchDeleteUser.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
    });
    builder.addCase(fetchDeleteUser.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.error.message;
      state.message = action.payload.message;
    });
    // PUT HANDLE ROLE USER
    builder.addCase(fetchHandleRoleUser.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
    });
    builder.addCase(fetchHandleRoleUser.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
    });
    builder.addCase(fetchHandleRoleUser.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.error.message;
      state.message = action.payload.message;
    });
    // GET ALL USER LIKES
    builder.addCase(fetchGetLikes.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      state.userLikes = 0;
    });
    builder.addCase(fetchGetLikes.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      state.userLikes = action.payload.length;
    });
    builder.addCase(fetchGetLikes.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.error.message;
      state.message = action.payload.message;
      state.userLikes = 0;
    });
    // POST SIGN GOOGLE
    builder.addCase(fetchSignGoogle.pending, (state) => {
      state.authLoading = "loading";
      state.errors = null;
      state.data = null;
    });
    builder.addCase(fetchSignGoogle.fulfilled, (state, action) => {
      state.authLoading = "loaded";
      state.errors = null;
      state.data = action.payload.user;
    });
    builder.addCase(fetchSignGoogle.rejected, (state, action) => {
      state.authLoading = "error";
      state.errors = action.error.message;
      state.data = null;
      state.message = action.payload.message;
    });
  },
});
export const isAuthenticated = (state) => Boolean(state.accountSlice.data);
export const accountReducer = accountSlice.reducer;
export const { logout } = accountSlice.actions;
