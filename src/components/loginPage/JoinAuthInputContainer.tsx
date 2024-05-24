import React from 'react';
import RoundButton from '../common/RoundButton';

const JoinAuthInputContainer = ({
  label,
  value,
  name,
  onChange,
  isError,
  isVerified,
  errorMessage,
  buttonClick,
  isAble,
  remainTime,
}: {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  isVerified: boolean;
  errorMessage: string;
  buttonClick: () => void;
  isAble: boolean;
  remainTime: number;
}) => {
  const displayTime = (time: number) => {
    if (time < 0) return '00:00';

    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  return (
    <div className="w-full flex flex-col gap-y-7 items-start justify-center">
      <div className="font-semibold text-14">{label}</div>
      <div className="w-full h-[50px] border-b border-gray-50 rounded-t-[13px] p-16 flex items-center justify-start gap-x-10">
        <input
          value={value}
          name={name}
          onChange={onChange}
          type="text"
          className="grow text-14 outline-none bg-transparent"
          placeholder="인증번호를 입력해주세요"
        />
        <div className="flex items-center justify-end gap-x-10">
          {remainTime && (
            <div className="font-medium text-14 text-main">
              {displayTime(remainTime)}
            </div>
          )}
          <RoundButton
            type={isVerified ? 'incomplete' : isAble ? 'fill' : 'disable'}
            text={isVerified ? '인증됨' : '인증번호 확인'}
            fontSize={14}
            onClick={buttonClick}
            isAble={isAble}
            w={'112px'}
            h={'35px'}
          />
        </div>
      </div>
      <div
        className={`w-full h-[20px] font-medium text-14 ${isVerified ? 'text-main' : 'text-negative'} ${isVerified || isError ? 'visible' : 'invisible'}`}
      >
        {isVerified ? '인증이 완료되었습니다.' : errorMessage}
      </div>
    </div>
  );
};

export default JoinAuthInputContainer;
