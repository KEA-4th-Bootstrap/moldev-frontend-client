import React from 'react';
import { ReactComponent as Search } from '../../assets/icons/icon_search_gray_800.svg';
import { ReactComponent as Close } from '../../assets/icons/icon_close_gray_800.svg';
import useSearch from '../../hooks/sidebar/search/useSearch';
import SearchOptionContainer from '../../components/sidebar/search/SearchOptionContainer';
import SearchListFooter from '../../components/sidebar/search/SearchListFooter';
import SearchResultEmpty from '../../components/sidebar/search/SearchResultEmpty';
import SearchResultIslandContainer from '../../components/sidebar/search/SearchResultIslandContainer';
import SearchResultPostContainer from '../../components/sidebar/search/SearchResultPostContainer';

const SearchPage = () => {
  const {
    search,
    handleSearchInput,
    option,
    handleOption,
    postList,
    islandList,
    handleKeydown,
    handleOnlyOption,
  } = useSearch();

  return (
    <div className="grow h-full flex flex-col items-start justify-start overflow-y-scroll scrollbar-hide">
      <div className="w-full mt-70 px-16 text-28">
        <div className="font-bold">전체 검색</div>
      </div>
      <div className="w-full flex items-center justify-center px-16 py-10 gap-x-10 mt-20 border-b-[0.5px] border-gray-100">
        <Search width={28} height={28} />
        <input
          className="grow outline-none border-none"
          type="text"
          placeholder="검색어를 입력하세요"
          value={search}
          onChange={handleSearchInput}
          onKeyDown={handleKeydown}
        />
        <Close
          className={`${search ? 'visible' : 'invisible'}`}
          width={28}
          height={28}
        />
      </div>
      <div className="w-full p-16 flex flex-col items-start justify-center gap-y-20 border-b-[0.5px] border-gray-100">
        <div className="text-12 font-medium text-gray-600">옵션</div>
        <div className="flex items-center justify-start gap-x-8">
          <SearchOptionContainer
            type="post"
            isClicked={option.includes('post')}
            onClick={() => handleOption('post')}
          />
          <SearchOptionContainer
            type="island"
            isClicked={option.includes('island')}
            onClick={() => handleOption('island')}
          />
        </div>
      </div>
      {option.includes('post') && (
        <div className="w-full p-16 flex flex-col items-start justify-center gap-y-20 border-b-[0.5px] border-gray-100">
          <div className="text-12 font-medium text-gray-600">게시글</div>
          {postList.length > 0 ? (
            option.length > 1 ? (
              postList
                .slice(0, 3)
                .map((post) => (
                  <SearchResultPostContainer key={post.id} item={post} />
                ))
            ) : (
              postList.map((post) => (
                <SearchResultPostContainer key={post.id} item={post} />
              ))
            )
          ) : (
            <SearchResultEmpty />
          )}
          {option.length !== 1 && (
            <SearchListFooter
              type="post"
              setOption={() => handleOnlyOption('post')}
            />
          )}
        </div>
      )}
      {option.includes('island') && (
        <div className="w-full p-16 flex flex-col items-start justify-center gap-y-20 border-b-[0.5px] border-gray-100">
          <div className="text-12 font-medium text-gray-600">섬</div>
          {islandList.length > 0 ? (
            option.length > 1 ? (
              islandList
                .slice(0, 3)
                .map((island) => (
                  <SearchResultIslandContainer
                    key={island.moldevId}
                    item={island}
                  />
                ))
            ) : (
              islandList.map((island) => (
                <SearchResultIslandContainer
                  key={island.moldevId}
                  item={island}
                />
              ))
            )
          ) : (
            <SearchResultEmpty />
          )}
          {option.length !== 1 && (
            <SearchListFooter
              type="island"
              setOption={() => handleOnlyOption('island')}
            />
          )}
        </div>
      )}
      <div className="w-full h-20 shrink-0" />
    </div>
  );
};

export default SearchPage;
