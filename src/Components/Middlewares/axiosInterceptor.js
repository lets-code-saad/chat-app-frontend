import axios from "axios";
import toast from "react-hot-toast";

const axiosInterceptor = axios.create({
  // baseURL: "http://localhost:8000", local host
  baseURL: "https://chirpchat-backend.vercel.app", // live
});

axiosInterceptor.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // very imp
  },
  (error) => Promise.reject(error)
);

axiosInterceptor.interceptors.response.use(
  (res) => res, // Successful responses
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Something went wrong";

    switch (status) {
      case 400:
        toast.error("Bad Request: " + message);
        break;

      case 401:
        toast.error("Unauthorized: " + message);
        localStorage.removeItem("token");
        window.location.href = "/login";
        break;

      case 403:
        toast.error("Forbidden: " + message);
        break;

      case 404:
        toast.error("Not Found: " + message);
        break;

      case 409:
        toast.error("Conflict: " + message);
        break;

      case 500:
        toast.error("Server Error: " + message);
        break;

      default:
        toast.error("Unexpected Error: " + message);
        break;
    }

    return Promise.reject(error);
  }
);


export default axiosInterceptor
