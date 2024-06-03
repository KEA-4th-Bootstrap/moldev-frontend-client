import { postListItemUserType } from '../../../data/type';
import { useQuery } from 'react-query';
import { getRecommendIslandApi } from '../../../api/mainApi';
import useAuthStore from '../../../store/useAuthStore';

const useRecommend = () => {
  const { isLoggedIn, logout } = useAuthStore();

  if (!isLoggedIn) {
    logout();
  }

  const {
    data: recommend,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useQuery<postListItemUserType[]>(
    `recommend`,
    () => getRecommendIslandApi().then((res) => res.data.data.searchList),
    {
      retry: false,
      enabled: isLoggedIn,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      onSuccess: (data) => {
        console.log('유저 추천 성공 --> ', data);
      },
      onError: (error) => {
        console.log('유저 추천 실패 --> ', error);
      },
    },
  );

  return { recommend, isError, isLoading, refetch, isLoggedIn, isFetching };
};

export default useRecommend;
