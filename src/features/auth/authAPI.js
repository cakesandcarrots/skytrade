
//DONE
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
  try {
    const response = await fetch(`http://localhost:3000/auth`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const logoutUser = async (userId) => {
  const response = await fetch("http://localhost:3000/auth");
  return response.json();
};
