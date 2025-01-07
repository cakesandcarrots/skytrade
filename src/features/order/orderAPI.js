export const createOrder = async (order) => {
  const response = await fetch("https://skytrade-backend.vercel.app/orders", {
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
  const finalUrl = "https://skytrade-backend.vercel.app/orders/all?" + queryString;
  const response = await fetch(finalUrl,{credentials:"include"});
  const data = await response.json();
  return data;
};
