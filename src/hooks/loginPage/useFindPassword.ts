import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { postMailOnPasswordApi, postVerifyEmailApi } from '../../api/authApi';
import { CustomError } from '../../api/customError';
import { patchPassword } from '../../api/memberApi';

export const useFindPassword = () => {
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
  const [isChangingStep, setIsChangingStep] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  // 이메일
  const [email, setEmail] = useState('');
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailFooter, setEmailFooter] = useState('');
  // 인증번호
  const [auth, setAuth] = useState('');
  const [remainTime, setRemainTime] = useState(180);
  const [isAuthVerified, setIsAuthVerified] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [authError, setAuthError] = useState('');
  /// 비밀번호
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);

  const { mutate: trySendEmail } = useMutation(
    () => postMailOnPasswordApi(email),
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        setIsEmailSend(true);
        setEmailFooter('인증번호가 전송되었습니다.');
      },
      onError: (error) => {
        console.log('error : ', error);
        setIsEmailError(true);
        const customError = error as CustomError;
        if (customError.response?.status === 404) {
          setEmailFooter('가입되지 않은 이메일입니다.');
        } else {
          setEmailFooter('이메일 전송에 실패했습니다.');
        }
      },
    },
  );

  const { mutate: tryCheckAuthNumber } = useMutation(
    () => postVerifyEmailApi(email, auth),
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        setIsAuthVerified(true);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
    },
  );

  const { mutate: tryPasswordChange } = useMutation(
    'passwordChange',
    () => patchPassword(email, password),
    {
      onSuccess: (data) => {
        setIsCompleted(true);
        console.log('비밀번호 변경 성공 --> ', data);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
    },
  );

  useEffect(() => {
    setIsEmailError(false);
    setIsEmailSend(false);
    setEmailFooter('');
  }, [email]);

  useEffect(() => {
    if (isEmailSend && !isAuthVerified && remainTime > 0) {
      const interval = setInterval(() => {
        setRemainTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isEmailSend, isAuthVerified, remainTime]);

  const checkAuth = () => {
    return auth.length > 0 && isEmailSend;
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.match(passwordRegEx)) {
      setIsPasswordError(false);
    } else {
      setIsPasswordError(true);
    }
  };

  const onClickEmailSend = () => {
    if (email.length > 0) {
      setIsEmailError(false);
      console.log('email : ', email);
      trySendEmail();
    } else {
      setEmailFooter('이메일을 입력해주세요.');
    }
  };

  const onClickAuthSubmit = () => {
    if (checkAuth()) {
      setIsAuthError(false);
      tryCheckAuthNumber();
    } else {
      setIsAuthError(true);
      setAuthError('이메일로 전송된 인증번호를 확인해주세요.');
    }
  };

  const onClickHandleNext = () => {
    if (isAuthVerified && isEmailSend) {
      setIsChangingStep(true);
    }
  };

  const onClickPasswordChange = () => {
    if (password !== '' && passwordCheck !== '' && password === passwordCheck) {
      console.log('email: ', email);
      console.log('password : ', password);
      tryPasswordChange();
    }
  };

  return {
    isChangingStep,
    isCompleted,
    setIsChangingStep,
    setIsCompleted,
    // 이메일
    email,
    emailFooter,
    isEmailSend,
    isEmailError,
    onEmailChange,
    onClickEmailSend,
    onClickHandleNext,
    // 인증번호
    auth,
    isAuthVerified,
    setAuth,
    onClickAuthSubmit,
    isAuthError,
    authError,
    remainTime,
    // 비밀번호
    password,
    onPasswordChange,
    passwordCheck,
    setPasswordCheck,
    isPasswordError,
    onClickPasswordChange,
  };
};
