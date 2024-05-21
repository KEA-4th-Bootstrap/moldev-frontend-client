import React, { useState } from 'react';
import { commentType } from '../../data/type';
import CommentItemWrapper from './CommentItemWrapper';
import { ReactComponent as ReplyIcon } from '../../assets/icons/icon_reply.svg';
import RectButton from '../common/RectButton';

const CommentItemContainer = ({ comment }: { comment: commentType }) => {
  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
  return (
    <div className="w-full flex flex-col items-start justify-center py-15 gap-y-20 border-b-[0.5px] border-gray-50">
      <CommentItemWrapper comment={comment} />
      <button
        className="flex items-center justify-center gap-x-10 px-16 py-6 border border-gray-50 text-gray-300 text-14 rounded-block"
        onClick={() => {
          setIsReplyOpen(!isReplyOpen);
        }}
      >
        <div>답글</div>
        <div>{comment.reply.length}</div>
      </button>
      {isReplyOpen && (
        <div className="w-full flex flex-col items-center justify-start">
          <div className="w-full flex items-start justify-start gap-x-10 pl-10 py-20">
            <ReplyIcon />
            <div className="grow flex flex-col items-end justify-center gap-y-15">
              <div className="w-full h-[150px] border border-gray-50">
                <textarea
                  className="w-full h-full resize-none outline-none border-none text-18 font-normal p-10"
                  placeholder="답글을 입력해주세요"
                />
              </div>
              <RectButton
                type="stroke"
                text="답글 등록"
                onClick={() => {}}
                h={'42px'}
                fontSize={16}
              />
            </div>
          </div>
          {comment.reply.map((reply, index) => (
            <div
              key={index}
              className="w-full flex items-start justify-start gap-x-10 pl-10 py-20"
            >
              <ReplyIcon />
              <CommentItemWrapper comment={reply} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItemContainer;
