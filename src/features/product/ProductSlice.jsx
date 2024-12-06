import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters,fetchAllBrands,fetchAllCategories} from "./ProductAPI";

const initialState = {
    products: [],
    totalitems: 0,
    status: 'idle',
    categories: [],
    brands: []
};

export const fetchAllProductsAsync = createAsyncThunk('product/fetchAllProducts',async()=>{
    const response = await fetchAllProducts();
    return response.data
});
export const fetchAllCategoriesAsync = createAsyncThunk('product/fetchAllCategories',async()=>{

    const response = await fetchAllCategories();
    return response.data
});
export const fetchAllBrandsAsync = createAsyncThunk('product/fetchAllBrands',async()=>{
    const response = await fetchAllBrands();
    return response.data
});


export const fetchProductsByFiltersAsync = createAsyncThunk('product/fetchProductsByFilters', async ({filter,sort,pagination}) => {
    const response = await fetchProductsByFilters({filter,sort,pagination});
    let filteredData = response.data.data;
    if (filter.category && filter.category.length) {
      filteredData = filteredData.filter(item => item.category === filter.category[filter.category.length-1]);
    }
    else if (filter.brand && filter.brand.length) {
      filteredData = filteredData.filter(item => item.brand === filter.brand[filter.brand.length-1]);
    }  
filteredData.totalitems = response.data.items
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
            state.totalitems = action.payload.totalitems
            state.products = action.payload.filter(item=>item!="totalitems")
        })
        .addCase(fetchAllCategoriesAsync.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(fetchAllCategoriesAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.categories = action.payload
        })
        .addCase(fetchAllBrandsAsync.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(fetchAllBrandsAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.brands = action.payload
        });
    },

})


export const selectAllProducts = (state)=>state.product.products;
export const selectItemCount = (state)=>state.product.totalitems;
export const selectAllCategories = (state)=>state.product.categories;
export const selectAllBrands = (state)=>state.product.brands;
export default productSlice.reducer;