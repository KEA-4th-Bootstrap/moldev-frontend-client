import React from 'react';
import { postListItemType } from '../../../data/type';

const SearchResultPostContainer = ({ item }: { item: postListItemType }) => {
  return (
    <div className="w-full flex flex-col rounded-block bg-white hover:bg-gray-100/40">
      <div className="w-full flex items-start justify-between p-8 gap-x-12">
        <div className="grow flex flex-col gap-y-6 items-start justify-center">
          <div className="font-bold">{item.postInfo.title}</div>
          <div className="text-14 line-clamp-3">{item.postInfo.content}</div>
        </div>
        <img
          className="w-[98px] h-[98px] rounded-block"
          src={item.postInfo.thumbnail}
          alt={item.postInfo.title}
        />
      </div>
      <div className="w-full flex items-center justify-start p-8 gap-8 text-12">
        <img
          className="w-[20px] h-[20px] rounded-full"
          src={item.userInfo.profileImgUrl}
          alt={item.userInfo.nickname}
        />
        <div className="grow font-medium text-black">
          {item.userInfo.nickname}
        </div>
        <div className="text-gray-300">{item.postInfo.viewCount}</div>
      </div>
    </div>
  );
};

export default SearchResultPostContainer;
