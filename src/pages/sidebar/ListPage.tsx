import React from 'react';
import CategoryBox from '../../components/sidebar/list/CategoryBox';
import { postListItemUserType } from '../../data/type';
import NeedMoldevPage from '../../components/common/NeedMoldevPage';

const ListPage = ({
  userInfoData,
}: {
  userInfoData: postListItemUserType | undefined;
}) => {
  return userInfoData ? (
    <div className="grow h-full flex flex-col items-start justify-start overflow-y-scroll">
      <div className="w-full mt-70 px-16 pb-30 text-28 flex flex-col gap-y-2 border-b-[0.5px] border-gray-50">
        <div className="flex items-center justify-start gap-x-6">
          <div className="font-bold">{userInfoData.nickname}</div>
          <div>님의</div>
        </div>
        <div className="flex items-center justify-start gap-x-6 flex-wrap gap-y-4">
          <div className="font-bold">{userInfoData.islandName}</div>
          <div>섬에 오신 걸 환영합니다.</div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-20 items-center justify-start py-16">
        <CategoryBox userInfo={userInfoData} category="ACTIVITY" />
        <CategoryBox userInfo={userInfoData} category="PROJECT" />
        <CategoryBox userInfo={userInfoData} category="AWARDS" />
        <CategoryBox userInfo={userInfoData} category="TROUBLE" />
      </div>
    </div>
  ) : (
    <NeedMoldevPage />
  );
};

export default ListPage;
