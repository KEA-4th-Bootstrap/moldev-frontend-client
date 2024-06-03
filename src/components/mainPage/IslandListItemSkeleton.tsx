import React from 'react';

const IslandListItemSkeleton = () => {
  return (
    <div className="animate-pulseFast grow flex flex-col items-center justify-center rounded-card gap-y-20 py-20 bg-gray-50">
      <div className="w-full flex items-center justify-start px-14 gap-x-12">
        <div className="w-[52px] h-[52px] rounded-full bg-gray-100" />
        <div className="grow flex flex-col items-start justify-center gap-y-4">
          <div className="w-[80px] h-[17px] rounded-block bg-gray-100" />
          <div className="w-[100px] h-[24px] rounded-block bg-gray-100" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-y-6 px-14">
        <div className="w-full flex justify-between items-center text-12 font-medium text-gray-400">
          <div className="w-[70px] h-[15px] rounded-block bg-gray-100" />
          <div className="w-[40px] h-[15px] rounded-block bg-gray-100" />
        </div>
        {/* <div className="w-full flex justify-between items-center text-12 font-medium text-gray-400">
          <div>최근 업데이트</div>
          <div>{item.updated}</div>
        </div> */}
      </div>
      <div className="w-full px-16 flex flex-col items-center justify-center gap-y-3">
        <div className="w-full rounded-block bg-gray-100 h-[30px]" />
        <div className="w-full rounded-block bg-gray-100 h-[30px]" />
        <div className="w-full rounded-block bg-gray-100 h-[30px]" />
      </div>
    </div>
  );
};

export default IslandListItemSkeleton;
