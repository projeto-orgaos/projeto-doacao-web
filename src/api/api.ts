import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig
  } from 'axios';
  
  const getAuthToken = (): string => {
    return localStorage.getItem('access_token') || '';
  };

  const baseURL = import.meta.env.VITE_API_URL;
  
  export const axiosInstanceAuthenticated: AxiosInstance = axios.create({
    baseURL,
  });
  
  axiosInstanceAuthenticated.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = getAuthToken();
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
  
  axiosInstanceAuthenticated.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  
  export const axiosInstanceUnauthenticated: AxiosInstance = axios.create({
    baseURL,
  });
  