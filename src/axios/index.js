import axiosInstance from 'axios';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const baseURL = process.env.REACT_APP_BASE_URL;

axiosInstance.defaults.baseURL = baseURL;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.accessToken;
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      (originalRequest._retry || originalRequest.url === `${baseURL}/api/auth/refresh-token`)
    ) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      history.push('/logout');
      return Promise.reject(error);
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        history.push('/logout');
        return Promise.reject(error);
      }
      return axiosInstance
        .post(`${baseURL}/api/auth/refresh-token`, {
          refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            axiosInstance.defaults.headers.common['Authorization'] = newAccessToken;
            return axiosInstance(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
