export async function fetchLoggedInUserOrders() {
  const response = await fetch("https://skytrade-backend.vercel.app/orders",{
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
  const response = await fetch("https://skytrade-backend.vercel.app/user/" + update.id, {
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
  const response = await fetch("https://skytrade-backend.vercel.app/user",{credentials: "include"});
  const data = await response.json();
  return data;
}
