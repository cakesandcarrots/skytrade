import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchItemsByUserId ,updateCart,deleteItemFromCart,resetCart} from "./cartAPI";
const initialState = {
    items:[],
    status:"idle"
}


export const addtoCartAsync = createAsyncThunk('card/addtoCart',async(item)=>{
    const response = await addToCart(item);
    return response;
});

export const fetchItemsByUserIdAsync = createAsyncThunk('card/fetchItemsByUserId',async(userId)=>{
    const response = fetchItemsByUserId(userId);
    return response; 

})

export const updateCartAsync = createAsyncThunk('card/updateCart',async(updateItem)=>{
    const response = await updateCart(updateItem);
    return response;
});


export const deleteItemFromCartAsync = createAsyncThunk('card/deleteItemFromCart',async(ItemId)=>{
    const response = await deleteItemFromCart(ItemId);
    return response;
});

export const resetCartAsync = createAsyncThunk('cart/resetCart',async(userId)=>{
    console.log(userId)
    const response = await resetCart(userId);
    return response
})
const cart = createSlice({
    name:"cart",
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(addtoCartAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.items.push(action.payload)
        })
        .addCase(addtoCartAsync.pending,(state)=>{
            state.status ='loading'; 
        })
        .addCase(fetchItemsByUserIdAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.items = action.payload
        })
        .addCase(fetchItemsByUserIdAsync.pending,(state)=>{
            state.status ='loading'; 
        })
        .addCase(updateCartAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            const index = state.items.findIndex((item)=>item.id===action.payload.id)
            state.items[index] = action.payload
        })
        .addCase(updateCartAsync.pending,(state)=>{
            state.status ='loading'; 
          
        })
        .addCase(deleteItemFromCartAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            const index = state.items.findIndex((item)=>item.id===action.payload)
            state.items.splice(index,1);
        })
        .addCase(deleteItemFromCartAsync.pending,(state)=>{
            state.status ='loading'; 
          
        })
        .addCase(resetCartAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.items = [];
        })
        .addCase(resetCartAsync.pending,(state)=>{
            state.status ='loading'; 
        })
        
    }
})
export const selectProductsByUserId = (state)=> state.cart.items;
export default cart.reducer;