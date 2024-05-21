import axios from 'axios';

export const baseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
