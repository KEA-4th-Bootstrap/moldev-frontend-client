import { categoryType } from '../data/type';
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

export const deleteCommentApi = async (commentId: string) => {
  return authAxios.delete(`/api/reply/${commentId}`);
};

export const postImageApi = async (image: File) => {
  // const formData = new FormData();
  // formData.append('image', image);
  return authAxios.post(
    `/api/post/image`,
    {
      thumbnail: image,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const postWriteApi = async (
  title: string,
  moldevId: string,
  content: string,
  profileContent: string,
  thumbnail: string,
  images: string[],
  category: string,
) => {
  return authAxios.post('/api/post', {
    title: title,
    moldevId: moldevId,
    content: content,
    profileContent: profileContent,
    thumbnail: thumbnail,
    images: images,
    category: category,
  });
};

export const patchPostApi = async (
  postId: number,
  title: string,
  moldevId: string,
  content: string,
  profileContent: string,
  thumbnail: string,
  category: string,
) => {
  return authAxios.patch(`/api/post/${postId}`, {
    title: title,
    moldevId: moldevId,
    content: content,
    profileContent: profileContent,
    thumbnail: thumbnail,
    category: category,
  });
};

export const deletePostApi = async (postId: number) => {
  return authAxios.delete(`/api/post/${postId}`, {
    data: {},
  });
};

export const getPostImagesApi = async (postId: number) => {
  return authAxios.get(`/api/post/${postId}/images`);
};

export const getMissionControl = async (
  moldevId: string,
  category: categoryType,
  page?: number,
  size?: number,
) => {
  return baseAxios.get(`/api/post/mission-control`, {
    params: {
      moldevId: moldevId,
      type: category,
      page: page ? page : 0,
      size: size ? size : 5,
    },
  });
};

export const getPostRecentListApi = async (
  moldevId: string,
  postId: number,
  category: categoryType,
  preCount: number,
  postCount: number,
) => {
  return baseAxios.get(`/api/post/${postId}/category/list`, {
    params: {
      moldevId: moldevId,
      type: category,
      preCount: preCount,
      postCount: postCount,
    },
  });
};
