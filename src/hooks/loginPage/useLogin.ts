import { useState } from 'react';
import { useMutation } from 'react-query';
import { postLoginApi } from '../../api/authApi';
import { setAccessToken, setMemberId } from '../../api/manageLocalStorage';
import { CustomError } from '../../api/customError';
import useAuthStore from '../../store/useAuthStore';

export const useLogin = (onClose: () => void) => {
  const { login } = useAuthStore();
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isFindPasswordOpen, setIsFindPasswordOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { mutate: tryLogin } = useMutation(
    () => postLoginApi(email, password),
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        setMemberId(data.data.data.memberId);
        setAccessToken(data.data.data.accessToken);
        login();
        onClose();
      },
      onError: (error) => {
        console.log('error : ', error);
        const customError = error as CustomError;
        if (customError.response?.status === 404) {
          // setEmailError(customError.response.data.message);
          setEmailError('가입되지 않은 이메일입니다.');
        } else if (customError.response?.status === 401) {
          // setPasswordError(customError.response.data.message);
          setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
          setEmailError('알 수 없는 오류가 발생했습니다.');
        }
      },
    },
  );

  const onLoginClick = () => {
    setEmailError('');
    setPasswordError('');

    console.log('login : ', email, password);
    if (email === '') {
      setEmailError('이메일을 입력해주세요');
      return;
    } else if (password === '') {
      setPasswordError('비밀번호를 입력해주세요');
      return;
    }
    tryLogin();
  };

  const tempClick = () => {
    console.log('tempClick');
    setAccessToken('temp');
    login();
    onClose();
  };

  return {
    isJoinOpen,
    setIsJoinOpen,
    isFindPasswordOpen,
    setIsFindPasswordOpen,
    email,
    setEmail,
    password,
    setPassword,
    onLoginClick,
    emailError,
    passwordError,
    tempClick,
  };
};
