import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, logoutUser } from "./authAPI";
const initialState = {
    loggedInUser: null,
    status: 'idle',
    error: null
};

export const createUserAsync = createAsyncThunk('user/createUserAsync',async(userData)=>{
    const response = await createUser(userData);
    return response
});

export const checkUserAsync = createAsyncThunk(
    "user/checkUserAsync",
    async (userData, { rejectWithValue }) => {
      try {
        const response = await checkUser(userData);
        if (response.error) {
          return rejectWithValue(response.error);
        }
        return response; 
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  

export const logoutUserAsync = createAsyncThunk('auth/logoutUser',async()=>{
    const response = await logoutUser()
    return response 
}) 
  

export const authSlice = createSlice({
    name: 'user',
    initialState, 
    reducers: {
        resetError:(state)=>{
            state.error = null
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(createUserAsync.pending,(state)=>{
            state.status ='loading';
            state.loggedInUser = null; 
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.loggedInUser = action.payload;
        })
        .addCase(checkUserAsync.pending,(state)=>{
            state.status ='loading';
            state.loggedInUser = null;
        })
        .addCase(checkUserAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.loggedInUser = action.payload
            state.error = null 
        })
        .addCase(checkUserAsync.rejected,(state,action)=>{
            state.status = 'idle';
            state.error = action.payload
        })
        .addCase(logoutUserAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.loggedInUser = null
        })
        .addCase(logoutUserAsync.pending,(state)=>{
            state.status ='loading';
        })
        
       
       
    },

})

export const {resetError} = authSlice.actions
export const selectLoggedInUser = (state)=>state.auth.loggedInUser
export const selectError = (state)=>state.auth.error
export default authSlice.reducer;