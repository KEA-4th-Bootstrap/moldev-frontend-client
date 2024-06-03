import { authAxios, baseAxios } from './axiosInstance';

export const patchPassword = async (email: string, password: string) => {
  return baseAxios.patch('/api/member/password', {
    email: email,
    password: password,
  });
};

export const getUserInfo = async (moldevId: string) => {
  return baseAxios.get(`/api/member/${moldevId}/profile`);
};

export const getMyInfo = async () => {
  return authAxios.get('/api/member/my');
};

export const patchProfileImage = async (profileImage: File) => {
  // const formData = new FormData();
  // formData.append('profileImage', profileImage);

  return authAxios.patch(
    '/api/member/profile-image',
    {
      profileImage: profileImage,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const patchProfile = async (nickname: string, islandName: string) => {
  return authAxios.patch('/api/member/my', { nickname, islandName });
};
