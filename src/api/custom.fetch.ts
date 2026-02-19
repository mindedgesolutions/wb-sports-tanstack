import axios, { type AxiosInstance } from 'axios';
import { tokenManager } from './token.manager';
import { refreshToken } from './auth.api';
import { userManager } from './user.manager';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) prom.resolve(token);
    else prom.reject(error);
  });

  failedQueue = [];
};

export const customFetch: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

customFetch.interceptors.request.use((config) => {
  const token = tokenManager.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

customFetch.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = 'Bearer ' + token;
              resolve(customFetch(originalRequest));
            },
            reject: (err: any) => reject(err),
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();

        if (!newToken) {
          isRefreshing = false;
          processQueue(null, null);
          return Promise.reject(error);
        }

        isRefreshing = false;

        processQueue(null, newToken);

        originalRequest.headers.Authorization = 'Bearer ' + newToken;

        return customFetch(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError, null);

        tokenManager.clear();
        userManager.clear();

        window.dispatchEvent(new CustomEvent('force-logout'));

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export function authHeaders() {
  const token = tokenManager.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
