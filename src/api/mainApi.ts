import { categoryType } from '../data/type';
import { authAxios, baseAxios } from './axiosInstance';

export const getTrendingPostListApi = async () => {
  return baseAxios.get('/api/compose/post/trend');
};

export const getTrendingIslandListApi = async () => {
  return baseAxios.get('/api/compose/post/trend-island');
};

export const getSidebarPostListApi = async (
  moldevId: string,
  category: categoryType,
  page: number,
  size: number,
) => {
  return baseAxios.get(
    `/api/post/${moldevId}/category?page=${page}&size=${size}&type=${category}`,
  );
};

export const getPostSearchApi = async (
  title: string,
  page?: number,
  size?: number,
) => {
  return baseAxios.get(
    `/api/compose/post/search?title=${title}&page=${page ? page : 0}&size=${size ? size : 3}`,
  );
};

export const getIslandSearchApi = async (
  searchText: string,
  page?: number,
  size?: number,
) => {
  return baseAxios.get(
    `/api/member/search?searchText=${searchText}&page=${page ? page : 0}&size=${size ? size : 3}`,
  );
};

export const getRecommendIslandApi = async () => {
  return authAxios.get(`/api/recommend`);
};
