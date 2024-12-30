
//DONE
export const fetchAllProducts = async () => {
  const response = await fetch("http://localhost:3000/products",{credentials:"include"});
  const data = await response.json();
  return { data };
};

export const fetchProductsByFilters = async ({ filter, sort, pagination }) => {
  let queryString = "";

  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${encodeURIComponent(lastCategoryValue)}&`;
    }
  }

  if (pagination._page && pagination._per_page)
    queryString += `_page=${pagination._page}&_per_page=${pagination._per_page}&`;

  if (sort._sort) {
    queryString += `_sort=${sort._sort}&`;
  }

  const finalUrl = "http://localhost:3000/products?" + queryString;
  const response = await fetch(finalUrl,{credentials:"include"});
  const data = await response.json();
  return { data };
};

export const fetchAllCategories = async () => {
  const response = await fetch("http://localhost:3000/categories",{credentials:"include"});
  const data = await response.json();
  return { data };
};

export const fetchAllBrands = async () => {
  const response = await fetch("http://localhost:3000/brands",{credentials:"include"});
  const data = await response.json();
  return { data };
};

export const fetchProductById = async (id) => {
  const response = await fetch("http://localhost:3000/products/" + id,{credentials:"include"});
  const data = await response.json();
  return { data };
};
export const createProduct = async(product)=>{

const response = await fetch("http://localhost:3000/products",
  {method: "POST",
  body: JSON.stringify(product),
  credentials:"include",
  headers: { "content-type": "application/json" }
})
const data = await response.json()
return {data}; 
}

export const updateProduct = async(product)=>{
  const response = await fetch("http://localhost:3000/products/"+product.id,
    {method: "PATCH",
      credentials:"include",
    body: JSON.stringify(product),
    headers: { "content-type": "application/json" }
  })
  const data = await  response.json()
  return {data};
}