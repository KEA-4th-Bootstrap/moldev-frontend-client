import React from 'react';
import { islandListItemType } from '../../../data/type';

const SearchResultIslandContainer = ({
  item,
}: {
  item: islandListItemType;
}) => {
  return (
    <div className="w-full flex flex-col rounded-block bg-white hover:bg-gray-100/40 px-8 py-7">
      <div className="w-full flex items-center justify-start gap-x-13">
        <img
          className="w-[32px] h-[32px] rounded-full"
          src={item.userImg}
          alt={item.userName}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="font-medium text-gray-40 text-12">
            {item.userName} 님의
          </div>
          <div>{item.islandName} 섬</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-6">
        <div className="w-full flex items-center justify-between text-gray-400 text-12 font-medium">
          <div>오늘의 방문자</div>
          <div>{item.visit}</div>
        </div>
        <div className="w-full flex items-center justify-between text-gray-400 text-12 font-medium">
          <div>최근 업데이트</div>
          <div>{item.updated}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultIslandContainer;
