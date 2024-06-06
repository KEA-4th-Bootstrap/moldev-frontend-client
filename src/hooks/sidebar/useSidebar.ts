import { useState } from 'react';
import { postListItemUserType, sideType } from '../../data/type';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserInfo } from '../../api/memberApi';

const useSidebar = (defaultSelected: sideType) => {
  const { moldevId, postId } = useParams();
  const [clicked, setClicked] = useState<sideType>(defaultSelected);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);

  const { data: userInfoData } = useQuery<postListItemUserType, Error>(
    [`getUserInfo-${moldevId}`, moldevId],
    () => getUserInfo(moldevId || '').then((res) => res.data.data),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      enabled: moldevId !== undefined && !postId,
      onSuccess: (data) => {
        console.log('남의 섬 받아오기 성공 -> ', data);
        setClicked('list');
      },
      onError: () => {
        console.log('남의 섬 받아오기 실패');
      },
    },
  );

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
