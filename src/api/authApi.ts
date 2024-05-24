import { joinType } from '../data/type';
import { baseAxios } from './axiosInstance';

/**
 * @name 로그인 API
 * @param email 로그인 이메일
 * @param password 로그인 비밀번호
 * @returns data: { memberId:number, accessToken: string }
 * @returns header : { set-cookie: Refresh_Token=string; Path=/; HttpOnly; }
 * @throws 404: Not Found
 * @throws 401: wrong password
 */
export const postLoginApi = async (email: string, password: string) => {
  return baseAxios.post('/api/auth/login', {
    email: email,
    password: password,
  });
};

/**
 * @name 회원가입 API
 * @param form 회원가입 정보
 * @returns data: {id : number}
 */
export const postSignupApi = async (
  form: joinType,
  profileImage: File | null,
) => {
  return baseAxios.post(
    '/api/auth/signup',
    {
      signUpRequestDto: new Blob([JSON.stringify(form)], {
        type: 'application/json',
      }),
      profileImage: profileImage
        ? new FormData().append('profileImage', profileImage)
        : null,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const getVerifyMoldevId = async (moldevId: string) => {
  return baseAxios.get(`/api/auth/check-duplicate/${moldevId}`);
};

/**
 * @name 메일 인증 코드 전송 (회원가입)
 * @param email 이메일
 * @returns data: {isSuccess: boolean}
 */
export const postMailOnSignupApi = async (email: string) => {
  return baseAxios.post('/api/auth/send-email', { email });
};

/**
 * @name 메일 인증 코드 전송 (비밀번호 변경)
 * @param email 이메일
 * @returns data: {isSuccess: boolean}
 */
export const postMailOnPasswordApi = async (email: string) => {
  return baseAxios.post('/api/auth/send-reset-email', { email });
};

/**
 * @name 메일 인증 코드 검증 (회원가입, 비밀번호 변경)
 * @param email 이메일
 * @param code 인증코드
 * @returns data: {isVerified: boolean}
 */
export const postVerifyEmailApi = async (email: string, code: string) => {
  return baseAxios.post('/api/auth/verify-email', { email, code });
};
