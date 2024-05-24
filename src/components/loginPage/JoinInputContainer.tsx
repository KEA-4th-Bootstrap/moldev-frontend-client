import React from 'react';
import RoundButton from '../common/RoundButton';

const JoinInputContainer = ({
  label,
  value,
  name,
  onChange,
  type,
  placeholder,
  isError,
  errorMessage,
  buttonText,
  buttonClick,
  isAble,
  remainTime,
}: {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  isError: boolean;
  errorMessage: string;
  buttonText?: string;
  buttonClick?: () => void;
  isAble?: boolean;
  remainTime?: number;
}) => {
  const displayTime = (time: number) => {
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
          type={type}
          className="grow text-14 outline-none bg-transparent"
          placeholder={placeholder}
        />
        {buttonText && buttonClick && (
          <div className="flex items-center justify-end gap-x-10">
            {remainTime && (
              <div className="font-medium text-14 text-main">
                {displayTime(remainTime)}
              </div>
            )}
            <RoundButton
              type="fill"
              text={buttonText}
              fontSize={14}
              onClick={buttonClick}
              isAble={isAble}
              w={'112px'}
              h={'35px'}
            />
          </div>
        )}
      </div>
      <div
        className={`w-full h-[20px] font-medium text-14 text-negative ${isError ? 'visible' : 'invisible'}`}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default JoinInputContainer;
