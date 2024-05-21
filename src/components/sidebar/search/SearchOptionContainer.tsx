import React from 'react';
import { searchOptionType } from '../../../data/type';
import { ReactComponent as Post } from '../../../assets/icons/icon_post.svg';
import { ReactComponent as PostSelected } from '../../../assets/icons/icon_post_main.svg';
import { ReactComponent as Location } from '../../../assets/icons/icon_location.svg';
import { ReactComponent as LocationSelected } from '../../../assets/icons/icon_location_main.svg';

const SearchOptionContainer = ({
  type,
  isClicked,
  onClick,
}: {
  type: searchOptionType;
  isClicked: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex items-center justify-center px-12 py-6 gap-x-6 rounded-[5px] ${isClicked ? 'text-main bg-main/10' : 'text-[#505B6E] bg-[#F3F4F8]'} cursor-pointer`}
      onClick={onClick}
    >
      {isClicked ? (
        type === 'post' ? (
          <PostSelected width={18} height={18} />
        ) : (
          <LocationSelected width={18} height={18} />
        )
      ) : type === 'post' ? (
        <Post width={18} height={18} />
      ) : (
        <Location width={18} height={18} />
      )}
      <div>{type === 'post' ? '게시글' : '섬'}</div>
    </div>
  );
};

export default SearchOptionContainer;
