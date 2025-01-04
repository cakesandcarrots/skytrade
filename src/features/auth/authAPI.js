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
  try {
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
      headers: { "content-type": "application/json" },
    });

    const data  =await response.json()

    if (!response.ok) {

      const error = await response.json();
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const logoutUser = async () => {
  const response = await fetch("http://localhost:3000/auth", {
    credentials: "include",
  });
  return response;
};

export const checkAuth = async () => {
  const response = await fetch("http://localhost:3000/auth/check",{credentials:"include"});
  if (!response.ok) {
    throw new Error("Failed to authenticate");
  }
  const data = await response.json();
  return data
};


export const resetPasswordRequest = async (email) => {
  const response = await fetch(
    "http://localhost:3000/auth/reset-password-request",
    {
      method: "POST",
      body: JSON.stringify({ email: email }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    return { success: false, message: "Failed to find an account" };
  }

  const data = await response.json();
  return { success: true, data };
};


export const resetPassword = async ({email,token, password}) => {
  const response = await fetch(
    "http://localhost:3000/auth/reset-password",
    {
      method: "POST",
      body: JSON.stringify({email,token, password}),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    return { success: false, message: "Failed to find an account" };
  }

  const data = await response.json();
  return { success: true, data };
};
