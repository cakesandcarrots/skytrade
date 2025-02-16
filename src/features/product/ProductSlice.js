import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByFilters,fetchAllBrands,fetchAllCategories, fetchProductById,createProduct, updateProduct} from "./ProductAPI";

const initialState = {
    products: [],
    totalItems: 0,
    status: 'idle',
    categories: [],
    brands: [],
    item: null,
    itemFetched: false
  
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


export const fetchProductsByFiltersAsync = createAsyncThunk('product/fetchProductsByFilters', async ({ filter, sort, pagination,role }) => {
  const response = await fetchProductsByFilters({ filter, sort, pagination,role });
  let filteredData = response.data.data;

  // Filter by categories if present
  if (filter.category && filter.category.length>0) {
    filteredData = filteredData.filter(item =>
      filter.category.includes(item.category)
    );
  }

  // Filter by brands if present
  if (filter.brand && filter.brand.length>0) {
    filteredData = filteredData.filter(item =>
      filter.brand.includes(item.brand)
    );
  }

  // Add the total items count to the filtered data
  filteredData.totalItems = response.data.items;
  return filteredData;
});

  
  

  export const fetchProductByIdAsync = createAsyncThunk('product/fetchProductById',async(id)=>{
    const response = await fetchProductById(id);
    return response.data;
});
  
  export const createProductAsync = createAsyncThunk('product/createProduct',async(product)=>{
    const response = await createProduct(product)
    return response.data; 
  })
export const updateProductAsync = createAsyncThunk('product/updateProductAsync',async(product)=>{
    const response = await updateProduct(product)
    return response.data
})

export const productSlice = createSlice({
    name: 'product',
    initialState, 
    reducers:{
        resetProduct: (state)=>{
            state.item = null;
            state.itemFetched = false;

        } ,
        setItemFetched: (state)=>{
            state.itemFetched = true;
        }
    },
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
            state.itemFetched =false;
        })
        .addCase(fetchProductsByFiltersAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.totalItems = action.payload.totalItems
            state.products = action.payload.filter(item=>item!="totalItems")
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
        })
        .addCase(fetchProductByIdAsync.pending,(state)=>{
            state.status ='loading';
            state.item = null
            state.itemFetched  =false

        })
        .addCase(fetchProductByIdAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.item = action.payload
            state.itemFetched  =true
        })
        .addCase(createProductAsync.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(createProductAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            state.products.push(action.payload)
        })
        .addCase(updateProductAsync.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(updateProductAsync.fulfilled,(state,action)=>{
            state.status = 'idle';
            const index = state.products.findIndex(item=>item.id===action.payload.id)
            state.products[index]= action.payload
        })
    },

})

export const {resetProduct}= productSlice.actions
export const {setItemFetched} = productSlice.actions
export const selectAllProducts = (state)=>state.product.products;
export const selectItemCount = (state)=>state.product.totalItems;
export const selectAllCategories = (state)=>state.product.categories;
export const selectAllBrands = (state)=>state.product.brands;
export const selectProductById = (state)=>state.product.item
export const selectItemFetchedStatus = (state)=>state.product.itemFetched
export default productSlice.reducer;