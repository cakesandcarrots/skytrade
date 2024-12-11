export const fetchAllProducts = async () => {
  const response = await fetch("http://localhost:3000/products");
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
  const response = await fetch(finalUrl);
  const data = await response.json();
  return { data };
};

export const fetchAllCategories = async () => {
  const response = await fetch("http://localhost:3000/categories");
  const data = await response.json();
  return { data };
};

export const fetchAllBrands = async () => {
  const response = await fetch("http://localhost:3000/brands");
  const data = await response.json();
  return { data };
};

export const fetchProductById = async (id) => {
  const response = await fetch("http://localhost:3000/products/" + id);
  const data = await response.json();
  return { data };
};
