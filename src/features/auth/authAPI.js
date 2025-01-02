//DONE
export const createUser = async (userData) => {
  const response = await fetch("http://localhost:3000/user", {
    method: "POST",
    body: JSON.stringify(userData),
    credentials: "include",
    headers: { "content-type": "application/json" },
  });
  const data = await response.json();
  return data;
};

export const login = async (userData) => {
  console.log(userData)
  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
      headers: { "content-type": "application/json" },
    });
    console.log(response)
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
  const response = await fetch("http://localhost:3000/auth", {
    credentials: "include",
  });
  return response.json();
};

export const checkAuth = async () => {
  const response = await fetch("http://localhost:3000/auth/check",{credentials:"include"});
  if (!response.ok) {
    throw new Error("Failed to authenticate");
  }
  const data = await response.json();
  return data
};
