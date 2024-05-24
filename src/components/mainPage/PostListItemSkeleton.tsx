import React from 'react';

const PostListItemSkeleton = () => {
  return (
    <div className="animate-pulseFast grow h-[300px] flex flex-col items-center justify-center rounded-card gap-y-10 bg-gray-50">
      <div className="shrink-0 h-[120px] w-full p-6 py-16">
        <div className="w-full h-full rounded-block bg-gray-100" />
      </div>
      <div className="w-full grow flex flex-col justify-between items-start px-13">
        <div className="w-full flex flex-col justify-start items-start gap-y-10">
          <div className="w-full h-[20px] text-16 bg-gray-100 rounded-block" />
          <div className="w-full flex flex-col items-start justify-between gap-y-8">
            <div className="w-full h-[15px] bg-gray-100 rounded-block" />
            <div className="w-full h-[15px] bg-gray-100 rounded-block" />
          </div>
        </div>
        <div className="w-1/3 bg-gray-100 h-[14px] rounded-block" />
      </div>
      <div className="shrink-0 w-full flex items-center justify-start px-13 py-10 gap-x-8 border-t-[0.5px] border-gray-100">
        <div className="w-[20px] h-[20px] object-cover rounded-full bg-gray-100" />
        <div className="w-[80px] h-[14px] bg-gray-100 rounded-block" />
      </div>
    </div>
  );
};

export default PostListItemSkeleton;
