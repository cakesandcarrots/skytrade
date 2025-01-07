import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAuth, createUser, login, logoutUser,resetPasswordRequest,resetPassword } from "./authAPI";
const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
  userChecked:false,
  mailSent: false,
  passwordReset: false
};

export const createUserAsync = createAsyncThunk(
  "auth/createUserAsync",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
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
  "auth/checkAuthAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkAuth();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPasswordRequestAsync = createAsyncThunk(
  "auth/resetPasswordRequestAsync",
  async (email) => {
    try {
      const response = await resetPasswordRequest(email);
      return response;
    } catch (error) {
      return error
    }
  }
);


export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPasswordAsync",
  async ({email,token,password}) => {
    try {
      const response = await resetPassword({email,token,password});
      return response;
    } catch (error) {
      return error
    }
  }
);

export const logoutUserAsync = createAsyncThunk("auth/logoutUser", async () => {
  const response = await logoutUser();
  return response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    togglePasswordReset: (state)=>{
      state.passwordReset = false; 
    }
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
        state.userChecked = true
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
        state.mailSent = false; 
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      })
  },
});

export const { resetError } = authSlice.actions;
export const {togglePasswordReset }  = authSlice.actions
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) =>state.auth.userChecked
export const selectResetMailSent = (state)=>state.auth.mailSent
export const selectPasswordReset = (state)=>state.auth.passwordReset
export default authSlice.reducer;
