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


export const fetchProductsByFiltersAsync = createAsyncThunk('product/fetchProductsByFilters', async ({filter,sort}) => {
    const response = await fetchProductsByFilters({filter,sort});
    let filteredData = response.data;
  console.log(filteredData)
  console.log(sort)
    if (filter.category && filter.category.length) {
      filteredData = filteredData.filter(item => item.category === filter.category[filter.category.length-1]);
    }
    else if (filter.brand && filter.brand.length) {
      filteredData = filteredData.filter(item => item.brand === filter.brand[filter.brand.length-1]);
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