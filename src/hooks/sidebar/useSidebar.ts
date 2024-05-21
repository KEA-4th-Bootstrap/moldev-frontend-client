import { useEffect, useState } from 'react';
import { sideType } from '../../data/type';

const useSidebar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [clicked, setClicked] = useState<sideType>('onboarding');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const memberName = '두두';
  const islandNamd = '복복두더지';

  useEffect(() => {
    setIsLogin(false);
  }, []);

  return {
    isLogin,
    clicked,
    setClicked,
    memberName,
    islandNamd,
    isLoginOpen,
    setIsLoginOpen,
    isLogoutOpen,
    setIsLogoutOpen,
    isMyPageOpen,
    setIsMyPageOpen,
  };
};

export default useSidebar;
