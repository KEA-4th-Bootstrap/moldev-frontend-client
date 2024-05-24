import { baseAxios } from './axiosInstance';

export const getTrendingPostListApi = async () => {
  return baseAxios.get('/api/compose/post/trend');
};
