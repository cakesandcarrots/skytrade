export const addToCart = async (item) => {
  const response = await fetch("https://skytrade-backend.vercel.app/cart", {
    method: "POST",
    credentials:"include",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const fetchItemsByUserId = async () => {
  const response = await fetch("https://skytrade-backend.vercel.app/cart",{credentials:"include"});
  const data =await response.json();
  return data;
};

export const updateCart = async (update) => {
    const response = await fetch("https://skytrade-backend.vercel.app/cart/"+update.id, {
      method: "PATCH",
      credentials:"include",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
};

export const deleteItemFromCart = async (cartItemId) => {
  const response = await fetch("https://skytrade-backend.vercel.app/cart/"+cartItemId, {
    credentials:"include",
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  return response.json();
};

export const resetCart = async () => {
  const cartItems = await fetchItemsByUserId();
  for (let item of cartItems){
   await deleteItemFromCart(item.id);
  }

  return true; 

};

