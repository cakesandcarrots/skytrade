import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, createUser, login, logoutUser } from "./authAPI";
const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
  userChecked:false
};

export const createUserAsync = createAsyncThunk(
  "user/createUserAsync",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const loginAsync = createAsyncThunk(
  "user/loginAsync",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await login(userData);
      if (response.error) {
        return rejectWithValue(response.error);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "user/checkAuthAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkAuth();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const logoutUserAsync = createAsyncThunk("auth/logoutUser", async () => {
  const response = await logoutUser();
  return response;
});

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.loggedInUser = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.loggedInUser = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
        state.loggedInUser = null;
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
        state.userChecked = true
      });
  },
});

export const { resetError } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) =>state.auth.userChecked
export default authSlice.reducer;
