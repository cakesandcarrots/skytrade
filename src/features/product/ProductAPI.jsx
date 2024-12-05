export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:3000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters({filter, sort}) {
  let queryString = "";
  console.log(filter)
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];

      queryString += `${key}=${encodeURIComponent(lastCategoryValue)}&`;
    }
  }

  if (sort._sort) {
    queryString += `_sort=${sort._sort}`;
  }

  const finalUrl = "http://localhost:3000/products?" + queryString;
console.log(finalUrl)
  return new Promise(async (resolve) => {
    const response = await fetch(finalUrl);
    const data = await response.json();
    resolve({ data });
  });
}
