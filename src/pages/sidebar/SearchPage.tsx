import React from 'react';
import { ReactComponent as Search } from '../../assets/icons/icon_search_gray_800.svg';
import { ReactComponent as Close } from '../../assets/icons/icon_close_gray_800.svg';
import useSearch from '../../hooks/sidebar/search/useSearch';
import SearchOptionContainer from '../../components/sidebar/search/SearchOptionContainer';
import SearchListFooter from '../../components/sidebar/search/SearchListFooter';
import SearchResultEmpty from '../../components/sidebar/search/SearchResultEmpty';
import SearchResultIslandContainer from '../../components/sidebar/search/SearchResultIslandContainer';
import SearchResultPostContainer from '../../components/sidebar/search/SearchResultPostContainer';
import InfiniteScroll from 'react-infinite-scroller';
import SearchResultPostSkeleton from '../../components/sidebar/search/SearchResultPostSkeleton';
import ErrorContainer from '../../components/common/ErrorContainer';
import SearchResultIslandSkeleton from '../../components/sidebar/search/SearchResultIslandSkeleton';
import LoadingSpinner from '../../components/common/LoadingSpinner';

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
    searchPostHasNextPage,
    searchPostIsLoading,
    searchPostIsError,
    fetchNextPost,
    searchPostIsFetchingNextPage,
    searchIslandHasNextPage,
    searchIslandIsLoading,
    searchIslandIsError,
    fetchNextIsland,
    searchIslandIsFetchingNextPage,
  } = useSearch();

  return (
    <div className="grow h-full flex flex-col items-start justify-start overflow-y-scroll scrollbar-hide">
      <div className="shrink-0 w-full mt-70 px-16 text-28">
        <div className="font-bold">전체 검색</div>
      </div>
      <div className="shrink-0 w-full flex items-center justify-center px-16 py-10 gap-x-10 mt-20 border-b-[0.5px] border-gray-100">
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
      <div className="shrink-0 w-full p-16 flex flex-col items-start justify-center gap-y-20 border-b-[0.5px] border-gray-100">
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
      {option.length >= 2 ? (
        <>
          <div className="w-full p-16 flex flex-col items-start justify-center gap-y-20 border-b-[0.5px] border-gray-100">
            <div className="text-12 font-medium text-gray-600">게시글</div>
            {postList.length > 0 ? (
              option.length > 1 ? (
                postList
                  .slice(0, 3)
                  .map((post) => (
                    <SearchResultPostContainer
                      key={post.postInfo.id}
                      moldevId={post.userInfo.moldevId}
                      item={post}
                    />
                  ))
              ) : (
                postList.map((post) => (
                  <SearchResultPostContainer
                    key={post.postInfo.id}
                    moldevId={post.userInfo.moldevId}
                    item={post}
                  />
                ))
              )
            ) : (
              <SearchResultEmpty />
            )}
            <SearchListFooter
              text="게시글"
              onClick={() => handleOnlyOption('post')}
            />
          </div>
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
            <SearchListFooter
              text="섬"
              onClick={() => handleOnlyOption('island')}
            />
          </div>
        </>
      ) : option.includes('post') ? (
        <InfiniteScroll
          className="w-full grow flex flex-col items-center justify-center p-16 gap-y-20"
          hasMore={searchPostHasNextPage ?? false}
          loadMore={() => {
            console.log('loadMore 호출');
            fetchNextPost();
          }}
          useWindow={false}
          key={option.length}
        >
          {searchPostIsLoading ? (
            <>
              <SearchResultPostSkeleton />
              <SearchResultPostSkeleton />
              <SearchResultPostSkeleton />
            </>
          ) : searchPostIsError ? (
            <ErrorContainer />
          ) : postList.length < 1 ? (
            <div className="w-full flex items-center justify-center py-60">
              <SearchResultEmpty />
            </div>
          ) : (
            postList.map((post) => (
              <SearchResultPostContainer
                key={post.postInfo.id}
                item={post}
                moldevId={post.userInfo.moldevId}
              />
            ))
          )}
          {searchPostIsFetchingNextPage && (
            <div className="w-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </InfiniteScroll>
      ) : (
        <InfiniteScroll
          className="w-full grow flex flex-col items-center justify-start p-16 gap-y-20"
          hasMore={searchIslandHasNextPage ?? false}
          loadMore={() => {
            console.log('island loadMore 호출');
            fetchNextIsland();
          }}
          useWindow={false}
          key={option.length}
        >
          {searchIslandIsLoading ? (
            <>
              <SearchResultIslandSkeleton />
              <SearchResultIslandSkeleton />
              <SearchResultIslandSkeleton />
            </>
          ) : searchIslandIsError ? (
            <ErrorContainer />
          ) : islandList.length < 1 ? (
            <div className="w-full flex items-center justify-center py-60">
              <SearchResultEmpty />
            </div>
          ) : (
            islandList.map((island) => (
              <SearchResultIslandContainer
                key={island.moldevId}
                item={island}
              />
            ))
          )}
          {searchIslandIsFetchingNextPage && (
            <div className="w-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
          )}
        </InfiniteScroll>
      )}
      <div className="w-full h-20 shrink-0" />
    </div>
  );
};

export default SearchPage;
