import { authAxios, baseAxios } from './axiosInstance';

export const getPostApi = async (moldevId: string, postId: number) => {
  return baseAxios.get(`/api/compose/post/${moldevId}/${postId}`);
};

export const getPostCommentApi = async (postId: number) => {
  return baseAxios.get(`/api/compose/reply/${postId}`);
};

export const getCommetReplyApi = async (commentId: string) => {
  return baseAxios.get(`/api/compose/reply?parentsId=${commentId}`);
};

export const postCommentApi = async (postId: number, content: string) => {
  return authAxios.post(`/api/reply`, {
    postId: postId,
    content: content,
  });
};

export const postReplyApi = async (
  postId: number,
  parentsId: string,
  content: string,
) => {
  return authAxios.post(`/api/reply`, {
    postId: postId,
    parentsId: parentsId,
    content: content,
  });
};
