

export async function fetchLoggedInUserOrders(userId) {
  const response = await fetch(
    "http://localhost:3000/orders?user=" + userId
  );
  const data = response.json();
  return data;
}


//done
export const updateUser = async (update) => {
  const response = await fetch("http://localhost:3000/user/" + update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};


//done
export async function fetchLoggedInUser(userId) {
  const response = await fetch("http://localhost:3000/user?id=" + userId);
  const data = await response.json();
  return data;
}
