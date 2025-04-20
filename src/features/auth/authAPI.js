//DONE
export const createUser = async (userData) => {
  const response = await fetch("https://skytrade-backend.vercel.app/user", {
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
    const response = await fetch("https://skytrade-backend.vercel.app/auth", {
      method: "POST",
      body: JSON.stringify(userData),
      credentials: "include",
      headers: { "content-type": "application/json" },
    });

    if (!response.ok) {
      const errorMessage = await response.text(); // Read the error message as text
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

export const logoutUser = async () => {
  const response = await fetch("https://skytrade-backend.vercel.app/auth", {
    credentials: "include",
  });
  return response;
};

export const checkAuth = async () => {
  const response = await fetch("https://skytrade-backend.vercel.app/auth/check",{credentials:"include"});
  if (!response.ok) {
    throw new Error("Failed to authenticate");
  }
  const data = await response.json();
  return data
};


export const resetPasswordRequest = async (email) => {
  const response = await fetch(
    "https://skytrade-backend.vercel.app/auth/reset-password-request",
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
    "https://skytrade-backend.vercel.app/auth/reset-password",
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
