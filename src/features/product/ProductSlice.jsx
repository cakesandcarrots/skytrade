import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters} from "./ProductAPI";

const initialState = {
    products: [],
    status: 'idle',
};

export const fetchAllProductsAsync = createAsyncThunk('product/fetchAllProducts',async()=>{
    const response = await fetchAllProducts();
    return response.data
});


export const fetchProductsByFiltersAsync = createAsyncThunk('product/fetchProductsByFilters', async (filter) => {
    const response = await fetchProductsByFilters(filter);
    let filteredData = response.data;
  
    if (filter.category) {
      filteredData = filteredData.filter(item => item.category === filter.category);
    }
    if (filter.brand) {
      filteredData = filteredData.filter(item => item.brand === filter.brand);
    }  
    return filteredData;
  });
  
  
  



export const productSlice = createSlice({
    name: 'product',
    initialState, 
    extraReducers: (builder) =>{
        builder
        .addCase(fetchAllProductsAsync.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(fetchAllProductsAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.products = action.payload
        })
        .addCase(fetchProductsByFiltersAsync.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(fetchProductsByFiltersAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.products = action.payload
        });
    },

})


export const selectAllProducts = (state)=>state.product.products;
export default productSlice.reducer;