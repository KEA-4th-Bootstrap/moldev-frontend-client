import React from 'react';
import { ReactComponent as More } from '../../../assets/icons/arrow_right_gray_600.svg';

const SearchListFooter = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <div
      className="flex items-center justify-start gap-x-5 text-12 text-gray-600 cursor-pointer"
      onClick={onClick}
    >
      <div>{text} 더보기</div>
      <More width={24} height={24} />
    </div>
  );
};

export default SearchListFooter;
