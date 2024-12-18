export async function fetchLoggedInUserOrders(userId){
    const response = await fetch('http://localhost:3000/orders?user.id='+userId)
    const data = response.json();
    return data; 

}



export const updateUser = async (update) => {
  console.log(update)
    const response = await fetch("http://localhost:3000/users/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
  };

  export async function fetchLoggedInUser(userId){
    const response = await fetch('http://localhost:3000/users?id='+userId)
    const data = await response.json();
    return data[0]; 

}
