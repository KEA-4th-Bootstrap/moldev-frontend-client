import { useQuery } from 'react-query';
import { categoryType, mainListPostItemType } from '../../data/type';
import { getSidebarPostListApi } from '../../api/mainApi';

export const useListCategoryBox = (
  moldevId: string,
  category: categoryType,
) => {
  const {
    isLoading: listIsLoading,
    error: listIsEerror,
    data: listData,
  } = useQuery<mainListPostItemType[]>(
    [`getPostList-${moldevId}-${category}`, moldevId, category],
    () =>
      getSidebarPostListApi(moldevId, category, 0, 2).then(
        (res) => res.data.data.postInfo,
      ),
    {
      enabled: !!moldevId, // moldevId가 있을 때만 실행
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      onSuccess: (data) => {
        console.log(`사이드바 ${category} 리스트 받아오기 성공 --> `, data);
      },
      onError: () => {
        console.log('getPostList error');
      },
    },
  );

  return { listIsLoading, listIsEerror, listData };
};
