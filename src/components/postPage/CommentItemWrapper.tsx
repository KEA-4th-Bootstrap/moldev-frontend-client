import React from 'react';
import { commentType } from '../../data/type';

const CommentItemWrapper = ({ comment }: { comment: commentType }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-20">
      <div className="w-full flex items-center justify-start gap-x-15">
        <img
          className="w-[40px] h-[40px] rounded-full object-cover"
          src={comment.userImg}
          alt="profile"
        />
        <div className="flex flex-col justify-center items-start gap-y-0 text-16">
          <div className="font-bold">{comment.userName}</div>
          <div className="text-gray-300">{comment.islandName} 섬</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-10 items-start justify-center">
        <div>{comment.content}</div>
        <div className="flex items-center justify-start gap-x-7 text-gray-300">
          <div>{comment.createdAt}</div>
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
