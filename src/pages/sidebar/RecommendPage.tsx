import React from 'react';
import { ReactComponent as Refresh } from '../../assets/icons/icon_refresh_gray_600.svg';
import EmptyRecommend from '../../components/sidebar/recommend/EmptyRecommend';
import useRecommend from '../../hooks/sidebar/recommend/useRecommend';
import RecommendListItemContainer from '../../components/sidebar/recommend/RecommendListItemContainer';

const RecommendPage = () => {
  const { recommend } = useRecommend(1);
  return (
    <div className="grow h-full flex flex-col items-start justify-start">
      <div className="w-full mt-70 pb-30 px-16 text-28 flex flex-col gap-y-2 border-b-[0.5px] border-gray-100">
        <div className="flex items-center justify-start gap-x-6">
          <div className="font-bold">챗봇</div>
          <div>님과</div>
        </div>
        <div className="flex items-center justify-start gap-x-6">
          <div>어울리는 섬을 알려드릴게요.</div>
        </div>
      </div>
      <div className="w-full grow flex flex-col gap-y-20 px-16 py-20 items-start justify-start">
        <div className="w-full flex items-center justify-between">
          <div className="font-medium text-12 text-gray-600">추천 섬</div>
          <Refresh width={18} height={18} />
        </div>
        <div className="w-full grow flex flex-col items-center justify-start">
          {recommend.length === 0 ? (
            <EmptyRecommend />
          ) : (
            recommend.map((item, index) => (
              <RecommendListItemContainer key={index} item={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendPage;
