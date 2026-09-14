import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// -------------------------
// Request Interceptor
// -------------------------

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// -------------------------
// Refresh Promise Lock
// -------------------------

let refreshPromise = null;

const refreshAccessToken = async () => {
  // اگر قبلاً refresh در حال انجام است،
  // همان Promise را به درخواست‌های دیگر می‌دهیم.
  if (!refreshPromise) {
    refreshPromise = api
      .post("/refresh")
      .then(({ data }) => {
        setAccessToken(data.accessToken);

        return data.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// -------------------------
// Response Interceptor
// -------------------------

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // اگر خطا 401 نیست
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // اگر درخواست قبلاً retry شده
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // خود refresh نباید دوباره refresh شود
    if (originalRequest.url?.includes("/refresh")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      clearAccessToken();

      return Promise.reject(refreshError);
    }
  },
);

export default api;
