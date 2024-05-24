import { useState } from 'react';
import { sideType } from '../../data/type';
import useAuthStore from '../../store/useAuthStore';

const useSidebar = () => {
  const { isLoggedIn: isLogin } = useAuthStore();
  const [clicked, setClicked] = useState<sideType>('onboarding');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const memberName = '두두';
  const islandNamd = '복복두더지';

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
