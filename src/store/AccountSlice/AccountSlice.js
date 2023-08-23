import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

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
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
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
      // Обработка ошибок, если необходимо
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
export const postCurrent = createAsyncThunk(
  "api/users/current",
  async ({ formData }, thunkAPI) => {
    try {
      // Выполнение запроса на сервер с использованием переданного токена
      const response = await axios.post("api/users/current", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
      // throw error;
    }
  }
);
export const postPassword = createAsyncThunk(
  "account/postPassword",
  async ({ formData }, thunkAPI) => {
    try {
      // Выполнение запроса на сервер с использованием переданного токена
      const response = await axios.post("account/password", formData);
      console.log(response.data, "postcurrent ");
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
      // throw error;
    }
  }
);
const initialState = {
  data: null,
  isLoading: "loading",
  errors: null,
  message: "",
};
const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    // postCurrent POST
    builder.addCase(postCurrent.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      state.data = {};
    });

    builder.addCase(postCurrent.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = "loaded";
      state.errors = null;
    });
    builder.addCase(postCurrent.rejected, (state, action) => {
      state.data = {};
      state.isLoading = "error";
      state.errors = action.payload;
      state.message = action.payload;
    });
    builder.addCase(postPassword.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      // state.data = null;
    });

    builder.addCase(postPassword.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = "loaded";
      state.errors = null;
    });
    builder.addCase(postPassword.rejected, (state, action) => {
      state.data = {};
      state.isLoading = "error";
      state.errors = action.error.message;
      state.message = action.payload.message;
    });
    // Login POST
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      state.data = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      state.data = action.payload.user;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.error.message;
      state.data = null;
      state.message = action.payload.message;
    });
    // Registration POST
    builder.addCase(fetchRegistration.pending, (state) => {
      state.isLoading = "loading";
      state.errors = null;
      state.data = null;
    });
    builder.addCase(fetchRegistration.fulfilled, (state, action) => {
      state.isLoading = "loaded";
      state.errors = null;
      state.data = action.payload.user;
    });
    builder.addCase(fetchRegistration.rejected, (state, action) => {
      state.isLoading = "error";
      state.errors = action.error.message;
      state.data = null;
      state.message = action.payload.message;
    });
  },
});
export const isAuthenticated = (state) => Boolean(state.accountSlice.data);
export const accountReducer = accountSlice.reducer;
export const { logout } = accountSlice.actions;
