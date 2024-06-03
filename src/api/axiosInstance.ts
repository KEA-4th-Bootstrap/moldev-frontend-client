import axios from 'axios';
import { getAccessToken } from './manageLocalStorage';
import { postReissueTokenApi } from './authApi';

export const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
  },
});

export const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
  },
});

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.withCredentials = true;
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = getAccessToken();
      if (accessToken) {
        try {
          const response = await postReissueTokenApi(accessToken);

          if (response.status === 200) {
            const newAccessToken = response.data.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            console.log('토큰 갱신 성공 --> ', response);
            // 갱신된 요청을 다시 보냅니다.
            return authAxios(originalRequest);
          }
        } catch (tokenRefreshError) {
          // 토큰 갱신 요청이 실패하면 에러를 반환합니다.
          console.log('토큰 갱신 실패 --> ', tokenRefreshError);
          return Promise.reject(tokenRefreshError);
        }
      }
    }
    return Promise.reject(error);
  },
);
