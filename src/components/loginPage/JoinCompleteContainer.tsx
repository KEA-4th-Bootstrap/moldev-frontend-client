import React from 'react';
import useJoin from '../../hooks/loginPage/useJoin';
import lottieJson from '../../assets/lottie/join_complete.json';
import Lottie from 'react-lottie-player';
import RectButton from '../common/RectButton';

const JoinCompleteContainer = ({
  hookReturns,
  onClick,
}: {
  hookReturns: ReturnType<typeof useJoin>;
  onClick: () => void;
}) => {
  const { userName, islandName } = hookReturns.form;
  return (
    <>
      <div className="w-full flex flex-col gap-y-[60px]">
        <div className="text-20 flex flex-col gap-y-3 w-full items-start justify-center">
          <div>
            <span className="font-semibold">{userName}</span> 님,
          </div>
          <div>
            <span className="font-semibold">{islandName}</span> 섬에 오신 것을
            환영합니다!
          </div>
        </div>
        <div className="w-full px-100 h-auto flex items-center justify-center">
          <Lottie
            className="w-full h-auto"
            loop
            animationData={lottieJson}
            play
          />
        </div>
      </div>
      <RectButton
        type="fill"
        text="몰데브 시작하기"
        onClick={onClick}
        isSubmit={true}
        isAble={true}
        w={'100%'}
        h={'53px'}
      />
    </>
  );
};

export default JoinCompleteContainer;
