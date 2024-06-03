import React from 'react';

const SearchResultPostSkeleton = () => {
  return (
    <div className="animate-pulseFast w-full flex flex-col rounded-block bg-white">
      <div className="w-full flex items-start justify-between p-8 gap-x-12">
        <div className="grow h-[98px] flex flex-col gap-y-6 items-start justify-center">
          <div className="w-full h-[20px] rounded-block bg-gray-100" />
          <div className="w-full grow rounded-block bg-gray-100" />
        </div>
        <div className="w-[98px] h-[98px] rounded-block bg-gray-100" />
      </div>
      <div className="w-full flex items-center justify-between p-8 gap-8 text-12">
        <div className="flex items-center justify-start gap-x-8">
          <div className="w-[20px] h-[20px] rounded-full bg-gray-100" />
          <div className="w-[42px] h-[18px] rounded-block bg-gray-100" />
        </div>
        <div className="w-[85px] h-[18px] rounded-block bg-gray-100" />
      </div>
    </div>
  );
};

export default SearchResultPostSkeleton;
