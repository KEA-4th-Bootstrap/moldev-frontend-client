import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo/logo_tree.svg';

const SearchResultEmpty = () => {
  return (
    <div className="w-full flex flex-col items-center justify-cente gap-y-10">
      <Logo />
      <div className="text-center text-14">
        검색 결과가 없습니다.
        <br />더 자세한 검색어를 입력해보세요.
      </div>
    </div>
  );
};

export default SearchResultEmpty;
