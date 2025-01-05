import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders } from "./orderAPI";
const initialState = {
    orders:[],
    status:"idle",
    currentOrder:null,
    totalOrders:null,
    orderCreated: false,
}
export const createOrderAsync = createAsyncThunk('card/createOrder',async(order)=>{
    const response = await createOrder(order);
    return response;
})
export const fetchAllOrdersAsync = createAsyncThunk('order/fetchAllOrders',async({sort,pagination})=>{
    const response = await fetchAllOrders({sort,pagination})
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
            state.orderCreated =true

        })
        .addCase(createOrderAsync.pending,(state)=>{
            state.status ='loading';
            state.orderCreated =false
 
        })
        .addCase(fetchAllOrdersAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.orders=action.payload
            state.totalOrders= action.payload.items
        })
        .addCase(fetchAllOrdersAsync.pending,(state)=>{
            state.status ='loading'; 
        })
    }
})
export const {resetOrder}  = order.actions;
export const selectAllOrders = (state)=>state.order.orders
export const selectCurrentOrder = (state)=>state.order.currentOrder
export const selectOrderCount = (state)=>state.order.totalOrders
export const selectOrderCreatedStatus = (state)=>state.order.orderCreated
export default  order.reducer;