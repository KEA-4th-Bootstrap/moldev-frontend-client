import { postListItemUserType } from '../../../data/type';
import { useQuery } from 'react-query';
import { getRecommendIslandApi } from '../../../api/mainApi';
import useAuthStore from '../../../store/useAuthStore';
import { CustomError } from '../../../api/customError';

const useRecommend = () => {
  const { isLoggedIn, logout } = useAuthStore();

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
      onError: (err) => {
        console.log('유저 추천 실패 --> ', err);
        const error = err as CustomError;
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
          logout();
        }
      },
    },
  );

  return { recommend, isError, isLoading, refetch, isLoggedIn, isFetching };
};

export default useRecommend;
