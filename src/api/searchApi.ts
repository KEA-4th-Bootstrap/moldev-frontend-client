import { baseAxios } from './axiosInstance';

export const getSearchPostApi = async (
  title: string,
  page?: number,
  size?: number,
) => {
  return baseAxios.get(
    `/api/compose/post/search?title=${title}&page=${page ? page : 0}&size=${size ? size : 10}`,
  );
};

export const getSearchIslandApi = async (
  text: string,
  page?: number,
  size?: number,
) => {
  return baseAxios.get(
    `/api/member/search?searchText=${text}&page=${page ? page : 0}&size=${size ? size : 10}`,
  );
};
