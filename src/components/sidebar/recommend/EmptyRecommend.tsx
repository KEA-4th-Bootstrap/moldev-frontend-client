import React from 'react';
import { ReactComponent as Logo } from '../../../assets/logo/logo_tree.svg';
import RoundButton from '../../common/RoundButton';

const EmptyRecommend = () => {
  return (
    <div className="w-full grow flex flex-col gap-y-30 items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center gap-y-9">
        <Logo width={50} height={50} />
        <div className="text-14 text-center">
          섬 추천을 위해 더 많은 데이터가 필요해요.
          <br />
          다양한 경험을 글로 작성해보세요.
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-y-10">
        <RoundButton
          type="fill"
          text="나만의 경험 작성하기"
          h={'37px'}
          fontSize={14}
          onClick={() => {}}
        />
        <div className="text-main font-medium text-12 cursor-pointer hover:underline hover:underline-offset-2">
          트렌딩 섬 알아보기
        </div>
      </div>
    </div>
  );
};

export default EmptyRecommend;
