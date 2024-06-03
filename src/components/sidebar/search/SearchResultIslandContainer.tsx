import React from 'react';
import { postListItemUserType } from '../../../data/type';
import { useNavigate } from 'react-router-dom';

const SearchResultIslandContainer = ({
  item,
}: {
  item: postListItemUserType;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full flex flex-col rounded-block bg-white hover:bg-gray-100/40 px-8 py-7 gap-y-10 cursor-pointer"
      onClick={() => navigate(`/${item.moldevId}`)}
    >
      <div className="w-full flex items-center justify-start gap-x-13">
        <img
          className="w-[32px] h-[32px] rounded-full"
          src={item.profileImgUrl}
          alt={item.nickname}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="font-medium text-gray-40 text-12">
            {item.nickname} 님의
          </div>
          <div>{item.islandName} 섬</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-6">
        <div className="w-full flex items-center justify-between text-gray-400 text-12 font-medium">
          <div>오늘의 방문자</div>
          <div>{item.todayViewCount}</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultIslandContainer;
