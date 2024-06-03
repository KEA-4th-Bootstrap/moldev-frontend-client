import { useQuery } from 'react-query';
import { postListItemType, recentListItemType } from '../../data/type';
import { getPostRecentListApi } from '../../api/postApi';

export const usePostRecentList = (
  post: postListItemType | null,
  moldevId: string,
) => {
  const { data, isLoading, isError } = useQuery<recentListItemType[]>(
    ['postRecentList', post?.postInfo.id, post?.postInfo.category, moldevId],
    () =>
      getPostRecentListApi(
        moldevId,
        post?.postInfo.id || 0,
        post?.postInfo.category || 'ACTIVITY',
        2,
        2,
      ).then((res) => {
        console.log('추가 게시글 조회 성공 --> ', res.data);
        return res.data.data.data.postList;
      }),
    {
      enabled: post !== null,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      onSuccess: (data) => {
        console.log('추가 게시글 조회 성공 성공 --> ', data);
      },
      onError: (error) => {
        console.log('추가 게시글 조회 실패 --> ', error);
      },
    },
  );

  return { data, isLoading, isError };
};
