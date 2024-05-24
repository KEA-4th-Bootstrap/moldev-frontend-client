import { postListItemType } from '../../data/type';
import { useQuery } from 'react-query';
import { getPostApi } from '../../api/postApi';
import { useState } from 'react';

const usePost = (moldevId: string, postId: number) => {
  const [post, setPost] = useState<postListItemType | null>(null);
  const { isLoading: postIsLoading, error: postIsError } = useQuery(
    'post',
    () => getPostApi(moldevId, postId),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log('data : ', data);
        const post: postListItemType = {
          postInfo: {
            ...data.data.data.postInfo,
          },
          userInfo: {
            ...data.data.data.postWriterInfo,
          },
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
