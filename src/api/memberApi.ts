import { baseAxios } from './axiosInstance';

export const patchPassword = async (password: string) => {
  return baseAxios.patch('/api/member/password', { password });
};
