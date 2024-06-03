import React from 'react';
import { mainListPostItemType, postListItemType } from '../../../data/type';
import { useSearchResultPost } from '../../../hooks/sidebar/search/useSearchResultPost';

const SearchResultPostContainer = ({
  item,
  moldevId,
  userName,
  profileImage,
}: {
  item: postListItemType | mainListPostItemType;
  moldevId: string;
  userName?: string;
  profileImage?: string;
}) => {
  const { post, userInfo, onClick } = useSearchResultPost(
    item,
    moldevId,
    userName,
    profileImage,
  );
  return (
    <div
      className="w-full flex flex-col rounded-block bg-white hover:bg-gray-100/40 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full flex items-start justify-between p-8 gap-x-12">
        <div className="grow flex flex-col gap-y-6 items-start justify-center">
          <div className="font-bold">{post.title}</div>
          <div className="text-14 line-clamp-3">{post.content}</div>
        </div>
        <img
          className="w-[98px] h-[98px] rounded-block object-cover"
          src={post.thumbnail}
          alt={post.title}
        />
      </div>
      <div className="w-full flex items-center justify-start p-8 gap-8 text-12">
        <img
          className="w-[20px] h-[20px] rounded-full"
          src={userInfo.profileImgUrl}
          alt={userInfo.nickname}
        />
        <div className="grow font-medium text-black">{userInfo.nickname}</div>
        <div className="text-gray-300">{post.viewCount}</div>
      </div>
    </div>
  );
};

export default SearchResultPostContainer;
