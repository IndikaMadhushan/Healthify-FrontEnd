import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:8080",
=======
  baseURL: import.meta.env.VITE_API_BASE_URL,
>>>>>>> ef6ddb898e99941eb8ad02b1a743c3b9d4e493b1
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;