
//DONE
export const fetchAllProducts = async () => {
  const response = await fetch("https://skytrade-backend.vercel.app/products",{credentials:"include"});
  const data = await response.json();
  return { data };
};

export const fetchProductsByFilters = async ({ filter, sort, pagination,role }) => {
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${encodeURIComponent(categoryValues)}&`;
    }
  }

  if (pagination._page && pagination._per_page)
    queryString += `_page=${pagination._page}&_per_page=${pagination._per_page}&`;

  if (sort._sort) {
    queryString += `_sort=${sort._sort}&`;
  }
  queryString+=`role=${role}`

  const finalUrl = "https://skytrade-backend.vercel.app/products?" + queryString;
  const response = await fetch(finalUrl,{credentials:"include"});
  const data = await response.json();
  return { data };
};

export const fetchAllCategories = async () => {
  const response = await fetch("https://skytrade-backend.vercel.app/categories",{credentials:"include"});
  const data = await response.json();
  return { data };
};

export const fetchAllBrands = async () => {
  const response = await fetch("https://skytrade-backend.vercel.app/brands",{credentials:"include"});
  const data = await response.json();
  return { data };
};

export const fetchProductById = async (id) => {
  const response = await fetch("https://skytrade-backend.vercel.app/products/" + id,{credentials:"include"});
  const data = await response.json();
  return { data };
};
export const createProduct = async(product)=>{

const response = await fetch("https://skytrade-backend.vercel.app/products",
  {method: "POST",
  body: JSON.stringify(product),
  credentials:"include",
  headers: { "content-type": "application/json" }
})
const data = await response.json()
return {data}; 
}

export const updateProduct = async(product)=>{
  const response = await fetch("https://skytrade-backend.vercel.app/products/"+product.id,
    {method: "PATCH",
      credentials:"include",
    body: JSON.stringify(product),
    headers: { "content-type": "application/json" }
  })
  const data = await  response.json()
  return {data};
}