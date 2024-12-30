export const addToCart = async (item) => {
  const response = await fetch("http://localhost:3000/cart", {
    method: "POST",
    credentials:"include",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const fetchItemsByUserId = async () => {
  const response = await fetch("http://localhost:3000/cart",{credentials:"include"});
  const data =await response.json();
  return data;
};

export const updateCart = async (update) => {
    const response = await fetch("http://localhost:3000/cart/"+update.id, {
      method: "PATCH",
      credentials:"include",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
};

export const deleteItemFromCart = async (itemId) => {
  const response = await fetch("http://localhost:3000/cart/"+itemId, {
    credentials:"include",
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  return itemId;
};

export const resetCart = async (userId) => {
  const cartItems = await fetchItemsByUserId();
  for (let item of cartItems){
   await deleteItemFromCart(item.user.id);
  }

  return userId; 

};

