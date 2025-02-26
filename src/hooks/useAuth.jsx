export const loginUser = async (email, password) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/auth/login", {
      username: email,  // OAuth2 expects "username" instead of "email"
      password,
    });

    localStorage.setItem("token", response.data.access_token); // Store token
    return response.data;
  } catch (error) {
    throw new Error("Invalid login credentials");
  }
};
