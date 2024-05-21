import React from 'react';
import { commentType } from '../../data/type';
import RectButton from '../common/RectButton';
import CommentItemContainer from './CommentItemContainer';

const CommentContainer = ({ commentList }: { commentList: commentType[] }) => {
  return (
    <div className="w-3/5 flex flex-col items-start justify-center py-30">
      <div className="text-20 font-medium">
        <span className="font-bold">{`${commentList.length} `}</span> 개의 댓글
      </div>
      <div className="w-full flex flex-col items-end justify-center gap-y-15 py-20">
        <div className="w-full h-[150px] border border-gray-50 p-10">
          <textarea
            className="w-full h-full resize-none outline-none border-none text-18 font-normal"
            placeholder="댓글을 입력해주세요"
          />
        </div>
        <RectButton
          type="stroke"
          text="댓글 등록"
          onClick={() => {}}
          h={'42px'}
          fontSize={16}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-start">
        {commentList.map((comment, index) => (
          <CommentItemContainer key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
