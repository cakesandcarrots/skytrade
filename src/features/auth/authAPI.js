
//DONE
export const createUser = async (userData) => {
  const response = await fetch("http://localhost:3000/user", {
    method: "POST",
    body: JSON.stringify(userData),
    credentials:"include",
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
      credentials: "include",
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

export const logoutUser = async () => {
  const response = await fetch("http://localhost:3000/auth",{credentials:"include"});
  return response.json();
};


