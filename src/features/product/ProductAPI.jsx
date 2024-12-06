export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters({filter, sort,pagination}) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];

      queryString += `${key}=${encodeURIComponent(lastCategoryValue)}&`;
    }
  }

  

  if(pagination._page && pagination._per_page)
  queryString+= `_page=${pagination._page}&_per_page=${pagination._per_page}&`
  if (sort._sort) {
    queryString += `_sort=${sort._sort}&`;
  }


  const finalUrl = "http://localhost:3000/products?" + queryString;
  return new Promise(async (resolve) => {
    const response = await fetch(finalUrl);
    const data = await response.json();
    resolve({ data });
  });
}


export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/brands");
    const data = await response.json();
    resolve({ data });
  });
}