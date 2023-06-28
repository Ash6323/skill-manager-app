import axios from "axios";
import { useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const axiosInstance = axios.create({
    baseURL: "https://localhost:7247/api/",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  return { axiosInstance, loading };
};

export default useHttp;
