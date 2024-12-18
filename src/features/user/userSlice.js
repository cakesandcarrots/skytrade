import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders,fetchLoggedInUser } from "./userAPI";
import { updateUser } from "./userAPI";
const initialState = {
    status:'idle',
    userOrders:[],
    userInfo: null //all info of the logged in user this will contain
}
export const fetchLoggedInUserOrdersAsync = createAsyncThunk('user/fetchLoggedInUserOrders',async(userId)=>{
    const response = await fetchLoggedInUserOrders(userId);
    return response;
})
export const updateUserAsync = createAsyncThunk('user/updateUser',async(userData)=>{
    const response = await updateUser(userData);
    return response
  })

  export const fetchLoggedInUserAsync = createAsyncThunk('user/fetchLoggedInUser',async(userId)=>{
    const response = await fetchLoggedInUser(userId);
    return response;
})

const user = createSlice({
    name:"user",
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(fetchLoggedInUserOrdersAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.userOrders = action.payload

        })
        .addCase(fetchLoggedInUserOrdersAsync.pending,(state)=>{
            state.status ='loading'; 
        })
        .addCase(updateUserAsync.pending,(state)=>{
            state.status = 'loading';

        })
        .addCase(updateUserAsync.fulfilled,(state,action)=>{
            state.status = 'idle';

            state.userInfo = action.payload 
            console.log(action.payload)           
        })
        .addCase(fetchLoggedInUserAsync.pending,(state)=>{
            state.status = 'loading';

        })
        .addCase(fetchLoggedInUserAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.userInfo = action.payload           
        })
        
    }
})
export const selectUserOrders = (state)=>state.user.userOrders
export const selectUserInfo = (state)=> state.user.userInfo
export default  user.reducer;