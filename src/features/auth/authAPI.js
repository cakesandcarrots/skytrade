export const createUser = async (userData) => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const checkUser = async (userData) => {
  const email = userData.email;
  try {
    const response = await fetch(`http://localhost:3000/users?email=${email}`);
    const data = await response.json();

    if (data.length === 0 || userData.password !== data[0].password) {
      throw new Error("Wrong credentials");
    }

    return data[0];
  } catch (error) {
    return { error: "Wrong credentials" };
  }
};

export const logoutUser = async (userId) => {
  return true;
};
