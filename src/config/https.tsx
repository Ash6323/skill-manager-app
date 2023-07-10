import axios from "axios";
import { useState } from "react";

const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const axiosInstance = axios.create({
    baseURL: "https://employee-skill-manager2.azurewebsites.net/api/",
    // baseURL: "https://localhost:7247/api/",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom: any) => {
      if (error) {
        prom.reject(error);
      } 
      else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  const refreshToken = async () => {
    try {
      console.log("Refresh Token api was called");
      const response = await axiosInstance.post(
        `Auth/RefreshToken`,
        {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken: localStorage.getItem("refreshToken"),
        }
      );
      const { accessToken, refreshToken } = response.data.data;

      // Storing the new tokens in local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return accessToken;
    } 
    catch (error) {
      throw error;
    }
  };

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
    async (error) => {
      const originalRequest = error.config;
      setLoading(false);
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {

          // Token refresh is already in progress, add the request to the queue
          try {
            const token = await new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return await axiosInstance(originalRequest);
          } catch (err) {
            return await Promise.reject(err);
          }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          refreshToken()
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              processQueue(null, token);
              resolve(axiosInstance(originalRequest));
            })
            .catch((error) => {
              processQueue(error, null);
              reject(error);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );

  return { axiosInstance, loading };
};

export default useHttp;
