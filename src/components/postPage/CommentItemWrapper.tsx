import React from 'react';
import { commentType, replyType } from '../../data/type';
import { useDateFormat } from '../../hooks/common/useDateFormat';

const CommentItemWrapper = ({
  comment,
}: {
  comment: commentType | replyType;
}) => {
  const info =
    'commentInfo' in comment ? comment.commentInfo : comment.replyInfo;
  const date = useDateFormat(info.createdAt);
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-20">
      <div className="w-full flex items-center justify-start gap-x-15">
        <img
          className="w-[40px] h-[40px] rounded-full object-cover"
          src={comment.userInfo.profileImgUrl}
          alt="profile"
        />
        <div className="flex flex-col justify-center items-start gap-y-0 text-16">
          <div className="font-bold">{comment.userInfo.nickname}</div>
          <div className="text-gray-300">{comment.userInfo.islandName} 섬</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-10 items-start justify-center">
        <div>{info.content}</div>
        <div className="flex items-center justify-start gap-x-7 text-gray-300">
          <div>{date}</div>
          <div className="w-px h-[16px] bg-gray-300" />
          <div className="hover:underline underline-offset-2 cursor-pointer">
            신고
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItemWrapper;
