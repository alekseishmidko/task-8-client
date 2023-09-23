import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: import.meta.env.VITE_BASE_URL,
});
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
