import React from 'react';
import { searchOptionType } from '../../../data/type';
import { ReactComponent as More } from '../../../assets/icons/arrow_right_gray_600.svg';

const SearchListFooter = ({
  type,
  setOption,
}: {
  type: searchOptionType;
  setOption: () => void;
}) => {
  return (
    <div
      className="flex items-center justify-start gap-x-5 text-12 text-gray-600 cursor-pointer"
      onClick={setOption}
    >
      <div>{type === 'post' ? '게시글' : '섬'} 더보기</div>
      <More width={24} height={24} />
    </div>
  );
};

export default SearchListFooter;
