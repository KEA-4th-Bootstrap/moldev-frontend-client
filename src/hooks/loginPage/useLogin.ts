import { useEffect, useState } from 'react';

export const useLogin = () => {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isFindPasswordOpen, setIsFindPasswordOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, []);

  return {
    isJoinOpen,
    setIsJoinOpen,
    isFindPasswordOpen,
    setIsFindPasswordOpen,
    email,
    setEmail,
    password,
    setPassword,
    isError,
    // setIsError,
  };
};
