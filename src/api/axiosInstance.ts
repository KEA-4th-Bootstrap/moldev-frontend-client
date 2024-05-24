import axios from 'axios';
import { getAccessToken } from './manageLocalStorage';

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
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
  },
});

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// authAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = Cooki
//       if (refreshToken) {
//         return authAxios
//           .post('/api/auth/refresh', { refreshToken })
//           .then((res) => {
//             if (res.status === 200) {
//               useAuthStore.setState({ accessToken: res.data.accessToken });
//               return authAxios(originalRequest);
//             }
//           });
//       }
//     }
//     return Promise.reject(error);
//   },
// );
