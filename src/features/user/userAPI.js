export async function fetchLoggedInUserOrders() {
  const response = await fetch("http://localhost:3000/orders",{
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

//done
export const updateUser = async (update) => {
  const response = await fetch("http://localhost:3000/user/" + update.id, {
    credentials: "include",
    method: "PATCH",
    body: JSON.stringify(update),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

//done
export async function fetchLoggedInUser() {
  const response = await fetch("http://localhost:3000/user",{credentials: "include"});
  const data = await response.json();
  return data;
}
