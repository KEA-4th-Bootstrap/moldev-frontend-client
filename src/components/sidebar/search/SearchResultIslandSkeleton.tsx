import React from 'react';

const SearchResultIslandSkeleton = () => {
  return (
    <div className="animate-pulseFast w-full h-[100px] flex flex-col gap-y-10 px-8 py-7">
      <div className="flex items-center justify-start gap-x-13">
        <div className="w-[36px] h-[36px] rounded-full bg-gray-100" />
        <div className="h-full flex flex-col gap-y-3 items-start justify-center">
          <div className="w-[75px] h-[16px] rounded-block bg-gray-100" />
          <div className="w-[90px] grow rounded-block bg-gray-100" />
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-y-6">
        <div className="w-full flex items-center justify-between">
          <div className="w-[66px] h-[16px] rounded-block bg-gray-100" />
          <div className="w-[36px] h-[16px] rounded-block bg-gray-100" />
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="w-[66px] h-[16px] rounded-block bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default SearchResultIslandSkeleton;
