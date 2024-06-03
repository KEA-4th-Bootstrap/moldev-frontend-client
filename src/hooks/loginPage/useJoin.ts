import { useCallback, useEffect, useRef, useState } from 'react';
import { joinType } from '../../data/type';
import useSteps from './useSteps';
import { useMutation, useQuery } from 'react-query';
import {
  getVerifyMoldevId,
  postMailOnSignupApi,
  postSignupApi,
  postVerifyEmailApi,
} from '../../api/authApi';
import { CustomError } from '../../api/customError';

const useJoin = () => {
  // 약관동의
  const [isTotalSelected, setIsTotalSelected] = useState(false);
  const [isServiceSelected, setIsServiceSelected] = useState(false);
  const [isPersonalSelected, setIsPersonalSelected] = useState(false);
  const [isThirdSelected, setIsThirdSelected] = useState(false);
  const [isMarketingSelected, setIsMarketingSelected] = useState(false);
  // 단계별 화면인지 여부
  const [isStepType, setIsStepType] = useState<boolean>(false);
  const { step, next, prev } = useSteps();

  // 정규식
  //email& 비밀번호 정규식
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
  // 프로필 이미지
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>('/img/img_empty_profile.png');
  const [checkName, setCheckName] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // 이메일
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [emailFooter, setEmailFooter] = useState('');
  // 인증번호
  const [auth, setAuth] = useState('');
  const [remainTime, setRemainTime] = useState(180);
  const [isAuthVerified, setIsAuthVerified] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const [authError, setAuthError] = useState('');
  // 비밀번호
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);
  // 몰디브 아이디
  const [isMoldevIdDuplicated, setIsMoldevIdDuplicated] = useState(true);
  const [isMoldevIdVerified, setIsMoldevIdVerified] = useState(false);
  const [moldevIdFooter, setMoldevIdFooter] = useState('');

  const { mutate: trySendEmail } = useMutation(
    () => postMailOnSignupApi(form.email),
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        setIsEmailSend(true);
      },
      onError: (error) => {
        console.log('error : ', error);
        setIsEmailError(true);
        const customError = error as CustomError;
        if (customError.response?.status === 409) {
          setEmailFooter('이미 가입된 이메일입니다.');
        } else {
          setEmailFooter('이메일 전송에 실패했습니다.');
        }
      },
    },
  );

  const { mutate: tryCheckAuthNumber } = useMutation(
    () => postVerifyEmailApi(form.email, auth),
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

  const { refetch: tryVerifyingMoldevId } = useQuery(
    'isVerifyingMoldevId',
    () => getVerifyMoldevId(form.moldevId),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log('data : ', data);
        const { isDuplicate } = data.data.data;
        console.log('isDuplicate : ', isDuplicate);
        setIsMoldevIdDuplicated(isDuplicate);
        if (!isDuplicate) {
          setMoldevIdFooter('사용 가능한 몰디브 아이디입니다.');
          setIsMoldevIdVerified(true);
        } else {
          setMoldevIdFooter('이미 사용중인 몰디브 아이디입니다.');
          setIsMoldevIdVerified(false);
        }
      },
      onError: (error) => {
        console.log('error : ', error);
        setMoldevIdFooter('오류가 발생하였습니다.');
        setIsMoldevIdVerified(false);
      },
    },
  );

  const { mutate: trySignup } = useMutation(
    () => postSignupApi(form, profileImage),
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        setIsComplete(true);
      },
      onError: (error) => {
        console.log('error : ', error);
        setIsComplete(false);
      },
    },
  );

  useEffect(() => {
    if (
      isServiceSelected &&
      isPersonalSelected &&
      isThirdSelected &&
      isMarketingSelected
    ) {
      setIsTotalSelected(true);
    } else {
      setIsTotalSelected(false);
    }
  }, [
    isServiceSelected,
    isPersonalSelected,
    isThirdSelected,
    isMarketingSelected,
  ]);

  useEffect(() => {
    if (isEmailSend && !isAuthVerified && remainTime > 0) {
      const interval = setInterval(() => {
        setRemainTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isEmailSend, isAuthVerified, remainTime]);

  const onClickTotal = () => {
    if (isTotalSelected) {
      setIsTotalSelected(false);
      setIsServiceSelected(false);
      setIsPersonalSelected(false);
      setIsThirdSelected(false);
      setIsMarketingSelected(false);
    } else {
      setIsTotalSelected(true);
      setIsServiceSelected(true);
      setIsPersonalSelected(true);
      setIsThirdSelected(true);
      setIsMarketingSelected(true);
    }
  };

  const [form, setForm] = useState<joinType>({
    isMarketingAgree: false,
    email: '',
    password: '',
    moldevId: '',
    nickname: '',
    islandName: '',
  });

  const onChangeMarketing = (isMarketing: boolean) => {
    setForm({
      ...form,
      isMarketingAgree: isMarketing,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    if (name === 'email') {
      setIsEmailError(false);
      setIsEmailSend(false);
      setEmailFooter('');
    } else if (name === 'password') {
      value.match(passwordRegEx)
        ? setIsPasswordError(false)
        : setIsPasswordError(true);
    } else if (name == 'moldevId') {
      setMoldevIdFooter('');
      setIsMoldevIdDuplicated(true);
      setIsMoldevIdVerified(false);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit 누름');
    e.preventDefault();
    trySignup();
    console.log('제출되었습니다 submit ---> ', form);
  };

  const onUpload = (e: any) => {
    const file = e.target.files[0];

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const checkEmail = () => {
    // 이메일 길이와 형식 확인
    return form.email.length > 0 && form.email.match(emailRegEx);
  };

  const checkAuth = () => {
    return auth.length > 0 && isEmailSend;
  };

  const checkNameIsAbleToConfirm = () => {
    return form.moldevId.length > 0;
  };

  const isAbleToStep2 = () => {
    return (
      form.email.length > 0 &&
      passwordCheck.length > 0 &&
      form.password === passwordCheck
    );
  };

  const onClickEmailSend = () => {
    if (checkEmail()) {
      setIsEmailError(false);
      setEmailFooter('인증번호가 전송되었습니다.');
      trySendEmail();
    } else {
      setIsEmailError(true);
      setEmailFooter('이메일 형식을 확인해주세요.');
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

  const onClickMoldevIdCheck = () => {
    if (form.moldevId.length > 0) {
      tryVerifyingMoldevId();
    } else {
      setMoldevIdFooter('몰디브 아이디를 입력해주세요.');
    }
  };

  return {
    // 약관동의
    isTotalSelected,
    isServiceSelected,
    isPersonalSelected,
    isThirdSelected,
    isMarketingSelected,
    setIsServiceSelected,
    setIsPersonalSelected,
    setIsThirdSelected,
    setIsMarketingSelected,
    onClickTotal,
    onChangeMarketing,
    // 이메일
    emailFooter,
    isEmailSend,
    isEmailError,
    onClickEmailSend,
    // 인증번호
    auth,
    isAuthVerified,
    setAuth,
    onClickAuthSubmit,
    isAuthError,
    authError,
    remainTime,
    // 비밀번호
    passwordCheck,
    setPasswordCheck,
    isPasswordError,
    // 몰디브 아이디
    moldevIdFooter,
    onClickMoldevIdCheck,
    isMoldevIdDuplicated,
    isMoldevIdVerified,
    // 이미지
    inputRef,
    preview,
    // 공통
    isStepType,
    checkName,
    isComplete,
    form,
    step,
    next,
    prev,
    setIsStepType,
    setCheckName,
    checkNameIsAbleToConfirm,
    onChange,
    onSubmit,
    onUpload,
    onUploadImageButtonClick,
    isAbleToStep2,
    setIsComplete,
  };
};

export default useJoin;
