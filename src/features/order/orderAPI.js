export const createOrder = async (order) => {
  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    body: JSON.stringify(order),
    credentials:"include",
    headers: { "content-type": "application/json" },
  });
  return response.json();
};

export const fetchAllOrders = async ({ sort, pagination }) => {
  let queryString = "";
  if (pagination._page && pagination._per_page)
    queryString += `_page=${pagination._page}&_per_page=${pagination._per_page}&`;

  if (sort) {
    queryString += `_sort=${sort}&`;
  }
  const finalUrl = "http://localhost:3000/orders/all?" + queryString;
  const response = await fetch(finalUrl,{credentials:"include"});
  const data = await response.json();
  return data;
};
