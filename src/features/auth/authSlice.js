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

export const checkUserAsync = createAsyncThunk('user/checkUserAsync', async (userData, { rejectWithValue }) => {
    const response = await checkUser(userData);
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response;
  });

export const logoutUserAsync = createAsyncThunk('auth/logoutUser',async(userId)=>{
    const response = await logoutUser(userId)
    return response 
}) 
  

export const authSlice = createSlice({
    name: 'user',
    initialState, 
    extraReducers: (builder) =>{
        builder
        .addCase(createUserAsync.pending,(state)=>{
            state.status ='loading';
            state.loggedInUser = null; 
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.loggedInUser = action.payload
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


export const selectLoggedInUser = (state)=>state.auth.loggedInUser
export const selectError = (state)=>state.auth.error
export default authSlice.reducer;