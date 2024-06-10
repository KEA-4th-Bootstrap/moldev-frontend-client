import { useMutation } from 'react-query';
import { getMoldevId } from '../../api/manageLocalStorage';
import { commentType, replyType } from '../../data/type';
import { useDateFormat } from '../common/useDateFormat';
import { deleteCommentApi } from '../../api/postApi';
import { useState } from 'react';

export const useCommentItemWrapper = (comment: commentType | replyType) => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const moldevId = getMoldevId();
  const info =
    'commentInfo' in comment ? comment.commentInfo : comment.replyInfo;
  const userInfo = comment.userInfo;
  const date = useDateFormat(info.createdAt);

  const { mutate: deleteComment } = useMutation(
    () => deleteCommentApi(info.id),
    {
      onSuccess: (data) => {
        console.log('댓글 삭제 성공 --> ', data);
        window.location.reload();
      },
      onError: (error) => {
        console.log('댓글 삭제 실패 --> ', error);
      },
    },
  );

  return {
    moldevId,
    info,
    userInfo,
    date,
    deleteComment,
    isReportOpen,
    setIsReportOpen,
  };
};
