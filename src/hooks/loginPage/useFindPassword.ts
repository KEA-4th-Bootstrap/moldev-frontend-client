import { useState } from 'react';

export const useFindPassword = () => {
  const [isChangingStep, setIsChangingStep] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [auth, setAuth] = useState('');
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  return {
    isChangingStep,
    isCompleted,
    setIsChangingStep,
    setIsCompleted,
    email,
    setEmail,
    isEmailSended,
    setIsEmailSended,
    auth,
    setAuth,
    isAuthChecked,
    setIsAuthChecked,
    password,
    setPassword,
    checkPassword,
    setCheckPassword,
  };
};
