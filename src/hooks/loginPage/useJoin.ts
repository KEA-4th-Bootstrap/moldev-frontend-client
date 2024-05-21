import { useCallback, useEffect, useRef, useState } from 'react';
import { joinType } from '../../data/type';
import useSteps from './useSteps';

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
  // 정보 입력
  const inputRef = useRef<HTMLInputElement>(null);
  const [authNumber, setAuthNumber] = useState('');
  const [remainTime, setRemainTime] = useState(180);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isAuthNumberCheck, setIsAuthNumberCheck] = useState(false);
  const [checkName, setCheckName] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  // 에러
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

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
    isMarketing: false,
    email: '',
    password: '',
    moldevId: '',
    userName: '',
    islandName: '',
    profileImage: '/img/img_empty_profile.png',
  });

  useEffect(() => {
    console.log('form ---> ', form);
  }, [form]);

  useEffect(() => {
    if (isEmailSend) {
      const interval = setInterval(() => {
        setRemainTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isEmailSend]);

  const onChangeMarketing = (isMarketing: boolean) => {
    setForm({
      ...form,
      isMarketing: isMarketing,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsComplete(true);
    console.log('제출되었습니다 submit ---> ', form);
  };

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setForm({
          ...form,
          profileImage: reader.result || '/img/img_empty_profile.png',
        });
        resolve(reader.result);
      };
    });
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const checkIsAbleToAuth = () => {
    console.log('email : ', form.email);
    return form.email.length > 0;
  };

  const checkIsAbleToConfirm = () => {
    return authNumber.length > 0 && isEmailSend;
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

  useEffect(() => {
    setIsError(false);
    setError('에러입니다');
  }, []);

  return {
    isTotalSelected,
    isServiceSelected,
    isPersonalSelected,
    isThirdSelected,
    isMarketingSelected,
    isStepType,
    authNumber,
    passwordCheck,
    isEmailSend,
    isAuthNumberCheck,
    checkName,
    inputRef,
    isComplete,
    form,
    step,
    next,
    prev,
    setIsServiceSelected,
    setIsPersonalSelected,
    setIsThirdSelected,
    setIsMarketingSelected,
    setIsStepType,
    onClickTotal,
    onChangeMarketing,
    setAuthNumber,
    setPasswordCheck,
    setIsEmailSend,
    setIsAuthNumberCheck,
    checkIsAbleToAuth,
    checkIsAbleToConfirm,
    setCheckName,
    checkNameIsAbleToConfirm,
    onChange,
    onSubmit,
    onUpload,
    onUploadImageButtonClick,
    isAbleToStep2,
    setIsComplete,
    isError,
    error,
    remainTime,
  };
};

export default useJoin;
