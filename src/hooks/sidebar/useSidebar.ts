import { useState } from 'react';
import { postListItemUserType, sideType } from '../../data/type';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserInfo } from '../../api/memberApi';

const useSidebar = () => {
  const { moldevId, postId } = useParams();

  const { data: userInfoData } = useQuery<postListItemUserType, Error>(
    [`getUserInfo-${moldevId}`, moldevId],
    () => getUserInfo(moldevId || '').then((res) => res.data.data),
    {
      refetchOnWindowFocus: false,
      enabled: moldevId !== undefined && !postId,
      onSuccess: (data) => {
        console.log('남의 섬 받아오기 성공 -> ', data);
      },
      onError: () => {
        console.log('남의 섬 받아오기 실패');
      },
    },
  );

  const [clicked, setClicked] = useState<sideType>('onboarding');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);

  return {
    clicked,
    setClicked,
    userInfoData,
    isLoginOpen,
    setIsLoginOpen,
    isLogoutOpen,
    setIsLogoutOpen,
    isMyPageOpen,
    setIsMyPageOpen,
  };
};

export default useSidebar;
