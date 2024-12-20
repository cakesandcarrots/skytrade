import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";
const initialState = {
    orders:[],
    status:"idle",
    currentOrder:null
}
export const createOrderAsync = createAsyncThunk('card/createOrder',async(order)=>{
    const response = await createOrder(order);
    return response;
})


const order = createSlice({
    name:"order",
    initialState,
    reducers:{
        resetOrder:(state)=>{
            state.currentOrder = null; 

        }

    },
    extraReducers: (builder)=>{
        builder
        .addCase(createOrderAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.orders.push(action.payload)
            state.currentOrder = action.payload; 
        })
        .addCase(createOrderAsync.pending,(state)=>{
            state.status ='loading'; 
        })
        
    }
})
export const {resetOrder}  = order.actions;
export const selectCurrentOrder = (state)=>state.order.currentOrder
export default  order.reducer;