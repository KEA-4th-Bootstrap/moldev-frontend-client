import { postListItemType } from '../../data/type';
import { useQuery } from 'react-query';
import { getPostApi } from '../../api/postApi';
import { useState } from 'react';

const usePost = (moldevId: string, postId: number) => {
  const [post, setPost] = useState<postListItemType | null>(null);
  const { isLoading: postIsLoading, error: postIsError } = useQuery(
    `post-${postId}`,
    () => getPostApi(moldevId, postId),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log('포스트 받아오기 성공 --> ', data);
        const post: postListItemType = {
          postInfo: {
            ...data.data.data.postInfo,
          },
          userInfo: {
            ...data.data.data.postWriterInfo,
          },
          viewCount: data.data.data.postInfo.viewCount,
        };
        setPost(post);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
    },
  );

  return { post, postIsLoading, postIsError };
};

export default usePost;
