import useLineHeader from '../../hooks/mainPage/useLineHeader';
import LineHeaderItemContainer from './LineHeaderItemContainer';
import PostListItemContainer from './PostListItemContainer';
import IslandListItemContainer from './IslandListItemContainer';
import PostListItemSkeleton from './PostListItemSkeleton';
import ErrorContainer from '../common/ErrorContainer';
import IslandListItemSkeleton from './IslandListItemSkeleton';
import EmptyContainer from '../common/EmptyContainer';

const LineHeaderContainer = () => {
  const {
    postList,
    islandList,
    selected,
    onClickPost,
    onClickIsland,
    postListIsLoading,
    postListIsError,
    islandListIsLoading,
    islandListIsError,
  } = useLineHeader();
  return (
    <div className="w-full grow flex flex-col items-start justify-start gap-y-20">
      <div className="w-full flex items-center justify-start px-16 border-b border-gray-100">
        <LineHeaderItemContainer
          text="트렌딩 게시글"
          isClicked={selected === 'post'}
          onClick={onClickPost}
        />
        <LineHeaderItemContainer
          text="트렌딩 섬"
          isClicked={selected === 'island'}
          onClick={onClickIsland}
        />
      </div>
      <div className="w-full grid grid-cols-3 gap-18 px-16">
        {selected === 'post' ? (
          postListIsLoading ? (
            <>
              <PostListItemSkeleton />
              <PostListItemSkeleton />
              <PostListItemSkeleton />
            </>
          ) : postListIsError ? (
            <>
              <div />
              <ErrorContainer />
              <div />
            </>
          ) : (
            postList.map((item, index) => (
              <PostListItemContainer key={index} item={item} />
            ))
          )
        ) : !islandList ? (
          islandListIsLoading ? (
            <>
              <IslandListItemSkeleton />
              <IslandListItemSkeleton />
              <IslandListItemSkeleton />
            </>
          ) : islandListIsError ? (
            <>
              <div />
              <ErrorContainer />
              <div />
            </>
          ) : (
            <>
              <div />
              <div>알 수 없는 에러가 발생하였습니다.</div>
              <div />
            </>
          )
        ) : islandList.length < 1 ? (
          <>
            <div />
            <EmptyContainer />
            <div />
          </>
        ) : (
          islandList.map((item, index) => (
            <IslandListItemContainer key={index} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default LineHeaderContainer;
