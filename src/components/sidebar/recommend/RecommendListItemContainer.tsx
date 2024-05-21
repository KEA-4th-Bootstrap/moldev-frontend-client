import React from 'react';
import { recommendIslandType } from '../../../data/type';

const RecommendListItemContainer = ({
  item,
}: {
  item: recommendIslandType;
}) => {
  return (
    <div className="w-full flex flex-col items-start justify-center px-8 py-7 rounded-block gap-y-4 bg-white hover:bg-gray-100/40">
      <div className="flex items-start justify-center text-12 text-main bg-info py-4 px-10 rounded-block">{`${item.percentage}% 일치`}</div>
      <div className="w-full flex items-center justify-start gap-x-13">
        <img
          className="w-[32px] h-[32px] rounded-full"
          src={item.island.userImg}
          alt="userImg"
        />
        <div className="flex flex-col items-start justify-center">
          <div className="text-gray-400 font-medium text-12">{`${item.island.userName} 님의`}</div>
          <div className="flex items-center justify-start gap-x-3">
            <div className="font-bold">{item.island.islandName}</div>
            <div>섬</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-6">
        <div className="w-full flex items-center justify-between font-medium text-12 text-gray-400">
          <div>오늘의 방문자</div>
          <div>{item.island.visit}명</div>
        </div>
        <div className="w-full flex items-center justify-between font-medium text-12 text-gray-400">
          <div>최근 업데이트</div>
          <div>{item.island.updated}</div>
        </div>
      </div>
    </div>
  );
};

export default RecommendListItemContainer;
