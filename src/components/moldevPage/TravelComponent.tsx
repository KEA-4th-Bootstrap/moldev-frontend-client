import React from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../../assets/lottie/travel.json';

const TravelComponent = ({
  nickname,
  islandName,
}: {
  nickname: string;
  islandName: string;
}) => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 flex flex-col items-center justify-center bg-black/30 z-10">
      <div className="flex flex-col items-center justify-center gap-y-2 text-20 animate-pulse">
        <div>
          <span className="font-semibold">{nickname}</span> 님의{' '}
          <span className="font-semibold">{islandName}</span> 섬으로
        </div>
        <div>여행을 떠나는 중입니다...</div>
      </div>
      <div className="w-[700px] h-[400px] flex items-center justify-center">
        <Lottie
          className="w-full h-auto"
          loop
          animationData={lottieJson}
          play
        />
      </div>
    </div>
  );
};

export default TravelComponent;
