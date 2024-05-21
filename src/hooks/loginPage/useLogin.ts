import { useState } from 'react';
import { useMutation } from 'react-query';
import { postLoginApi } from '../../api/authApi';
import { setAccessToken, setMemberId } from '../../api/manageLocalStorage';
import { CustomError } from '../../api/customError';

export const useLogin = (onClose: () => void) => {
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
        setMemberId(data.data.memberId);
        setAccessToken(data.data.accessToken);
        onClose();
      },
      onError: (error) => {
        console.log('error : ', error);
        const customError = error as CustomError;
        if (customError.response?.status === 404) {
          setEmailError(customError.response.data.message);
        } else if (customError.response?.status === 401) {
          setPasswordError(customError.response.data.message);
        }
      },
    },
  );

  const onLoginClick = () => {
    console.log('login : ', email, password);
    setEmailError('');
    setPasswordError('');
    tryLogin();
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
  };
};
