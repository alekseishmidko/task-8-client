import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://task-8.onrender.com",
});
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = window.localStorage.getItem("token");
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
