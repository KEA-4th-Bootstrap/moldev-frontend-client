import React from 'react';
import { ReactComponent as Refresh } from '../../assets/icons/icon_refresh_gray_600.svg';
import EmptyRecommend from '../../components/sidebar/recommend/EmptyRecommend';
import useRecommend from '../../hooks/sidebar/recommend/useRecommend';
import ErrorContainer from '../../components/common/ErrorContainer';
import SearchResultIslandContainer from '../../components/sidebar/search/SearchResultIslandContainer';
import SearchResultIslandSkeleton from '../../components/sidebar/search/SearchResultIslandSkeleton';
import NeedLoginContainer from '../../components/common/NeedLoginContainer';
import { getNickname } from '../../api/manageLocalStorage';

const RecommendPage = () => {
  const { recommend, isLoading, isFetching, isError, isLoggedIn, refetch } =
    useRecommend();
  const nickname = getNickname();

  return isLoggedIn ? (
    <div className="grow h-full flex flex-col items-start justify-start">
      <div className="w-full mt-70 pb-30 px-16 text-28 flex flex-col gap-y-2 border-b-[0.5px] border-gray-100">
        <div className="flex items-center justify-start gap-x-6">
          <div className="font-bold">{nickname ? nickname : '당신'}</div>
          <div>님과</div>
        </div>
        <div className="flex items-center justify-start gap-x-6">
          <div>어울리는 섬을 알려드릴게요.</div>
        </div>
      </div>
      <div className="w-full grow flex flex-col gap-y-20 px-16 py-20 items-start justify-start">
        <div className="w-full flex items-center justify-between">
          <div className="font-medium text-12 text-gray-600">추천 섬</div>
          <Refresh
            className="cursor-pointer"
            width={18}
            height={18}
            onClick={() => refetch()}
          />
        </div>
        <div className="w-full grow flex flex-col items-center justify-start gap-y-16">
          {!recommend || isFetching ? (
            isLoading || isFetching ? (
              <>
                <SearchResultIslandSkeleton />
                <SearchResultIslandSkeleton />
                <SearchResultIslandSkeleton />
              </>
            ) : isError ? (
              <ErrorContainer />
            ) : (
              <div>알 수 없는 에러가 발생하였습니다.</div>
            )
          ) : recommend.length < 1 ? (
            <EmptyRecommend />
          ) : (
            recommend.map((item, index) => (
              <SearchResultIslandContainer key={index} item={item} />
            ))
          )}
        </div>
      </div>
    </div>
  ) : (
    <NeedLoginContainer />
  );
};

export default RecommendPage;
