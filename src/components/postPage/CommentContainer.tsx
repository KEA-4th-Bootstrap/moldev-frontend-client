import React from 'react';
import RectButton from '../common/RectButton';
import CommentItemContainer from './CommentItemContainer';
import { useComment } from '../../hooks/postPage/useComment';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorContainer from '../common/ErrorContainer';

const CommentContainer = ({ postId }: { postId: number }) => {
  const {
    commentList,
    commentIsLoading,
    commentIsError,
    content,
    onChangeContent,
    onCommentClick,
  } = useComment(postId);
  return (
    <div className="w-3/5 flex flex-col items-start justify-center py-30">
      <div className="text-20 font-medium">
        <span className="font-bold">{`${commentList ? commentList.length : 0} `}</span>{' '}
        개의 댓글
      </div>
      <div className="w-full flex flex-col items-end justify-center gap-y-15 py-20">
        <div className="w-full h-[150px] border border-gray-50 p-10">
          <textarea
            className="w-full h-full resize-none outline-none border-none text-18 font-normal"
            placeholder="댓글을 입력해주세요"
            value={content}
            onChange={onChangeContent}
          />
        </div>
        <RectButton
          type="stroke"
          text="댓글 등록"
          onClick={onCommentClick}
          h={'42px'}
          fontSize={16}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        {!commentList ? (
          commentIsLoading ? (
            <LoadingSpinner />
          ) : commentIsError ? (
            <ErrorContainer />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-20 font-medium text-gray-700">
                댓글이 존재하지 않습니다.
              </div>
            </div>
          )
        ) : commentList.length < 1 ? (
          <div className="w-full h-full flex items-center justify-center py-70 mb-60 bg-gray-50 rounded-block">
            <div className="text-18 font-medium text-gray-400">
              댓글이 존재하지 않습니다.
            </div>
          </div>
        ) : (
          commentList.map((comment) => (
            <CommentItemContainer
              key={comment.commentInfo.id}
              comment={comment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentContainer;
