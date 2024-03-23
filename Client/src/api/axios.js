import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_WEB_API_URL,
  headers: {
    "Content-Type": "application/json",
  }
});

// Request interceptor to add the token to the request headers
instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
