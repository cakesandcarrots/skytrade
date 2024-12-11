import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authAPI";
const initialState = {
    loggedInUser: null,
    status: 'idle'
};

export const createUserAsync = createAsyncThunk('user/createUserAsync',async(userData)=>{
    const response = await createUser(userData);
    console.log(response)
    return response
});


export const authSlice = createSlice({
    name: 'user',
    initialState, 
    extraReducers: (builder) =>{
        builder
        .addCase(createUserAsync.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(createUserAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.loggedInUser = action.payload
        })
       
    },

})


export const selectLoggedInUser = (state)=>{state.auth.loggedInUser}
export default authSlice.reducer;