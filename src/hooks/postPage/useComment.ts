import { useState } from 'react';
import { getPostCommentApi, postCommentApi } from '../../api/postApi';
import { useQuery, useMutation } from 'react-query';
import { commentType } from '../../data/type';

export const useComment = (postId: number) => {
  const [content, setContent] = useState('');
  const [commentList, setCommentList] = useState<commentType[]>([]);
  const {
    isLoading: commentIsLoading,
    error: commentIsError,
    refetch: commentRefetch,
  } = useQuery(`comment-${postId}`, () => getPostCommentApi(postId), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log('data : ', data);
      const commentList: commentType[] = [];
      for (let i = 0; i < data.data.data.commentInfo.commentList.length; i++) {
        commentList.push({
          commentInfo: {
            ...data.data.data.commentInfo.commentList[i],
          },
          userInfo: {
            ...data.data.data.userInfo.userList[i],
          },
        });
      }
      setCommentList(commentList);
    },
    onError: (error) => {
      console.log('error : ', error);
    },
  });

  const { mutate: tryPostComment } = useMutation(
    () => postCommentApi(postId, content),
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        commentRefetch();
      },
      onError: (error) => {
        console.log('error : ', error);
      },
    },
  );

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onCommentClick = () => {
    if (content === '') {
      return;
    }
    console.log('comment : ', content);
    setContent('');
    tryPostComment();
  };

  return {
    commentList,
    commentIsLoading,
    commentIsError,
    content,
    onChangeContent,
    onCommentClick,
  };
};
