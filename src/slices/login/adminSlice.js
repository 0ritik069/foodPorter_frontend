import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getApi } from "../../services/getApi";

// Async thunk for login
export const loginAdmin = createAsyncThunk(
  "auth/login/admin",
  async (credentials, thunkApi) => {
    try {
      const response = await getApi(credentials);
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  admin: null,
  token: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login Failed";
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
