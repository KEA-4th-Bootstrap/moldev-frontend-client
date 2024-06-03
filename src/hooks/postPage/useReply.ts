import { useState } from 'react';
import { replyType } from '../../data/type';
import { useMutation, useQuery } from 'react-query';
import { getCommetReplyApi, postReplyApi } from '../../api/postApi';

export const useReply = (
  postId: number,
  commentId: string,
  isReplyOpen: boolean,
) => {
  const [content, setContent] = useState('');
  const [replyList, setReplyList] = useState<replyType[]>([]);
  const {
    isLoading: replyIsLoading,
    error: replyIsError,
    refetch: replyRefetch,
  } = useQuery(`reply-${commentId}`, () => getCommetReplyApi(commentId), {
    refetchOnWindowFocus: false,
    enabled: isReplyOpen,
    onSuccess: (data) => {
      console.log('data : ', data);
      const replyList: replyType[] = [];
      for (let i = 0; i < data.data.data.replyInfo.replyList.length; i++) {
        replyList.push({
          replyInfo: {
            ...data.data.data.replyInfo.replyList[i],
          },
          userInfo: {
            ...data.data.data.userInfo.userList[i],
          },
        });
      }
      setReplyList(replyList);
    },
    onError: (error) => {
      console.log('error : ', error);
    },
  });

  const { mutate: tryPostReply } = useMutation(
    () => postReplyApi(postId, commentId, content),
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        replyRefetch();
        setContent('');
      },
      onError: (error) => {
        console.log('error : ', error);
      },
    },
  );

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onReplyClick = () => {
    if (content === '') {
      return;
    }
    tryPostReply();
  };

  return {
    replyList,
    replyIsLoading,
    replyIsError,
    content,
    onChangeContent,
    onReplyClick,
  };
};
