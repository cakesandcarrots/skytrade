export const addToCart = async (item) => {
  const response = await fetch("http://localhost:3000/cart", {
    method: "POST",
    body: JSON.stringify(item),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const fetchItemsByUserId = async (userId) => {
  const response = await fetch("http://localhost:3000/cart?user=" + userId);
  const data =await response.json();
  console.log(data)
  return data;
};

export const updateCart = async (update) => {
    const response = await fetch("http://localhost:3000/cart/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
};

export const deleteItemFromCart = async (itemId) => {
  const response = await fetch("http://localhost:3000/cart/"+itemId, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });
  return itemId;
};

export const resetCart = async (userId) => {
  console.log(userId)
  const cartItems = await fetchItemsByUserId(userId);
  for (let item of cartItems){
    console.log(item)
   await deleteItemFromCart(item.user.id);
  }

  return userId; 

};

