import React from 'react';
import RoundButton from '../common/RoundButton';

const JoinEmailInputContainer = ({
  label,
  value,
  name,
  onChange,
  isError,
  isSended,
  footerMessage,
  buttonClick,
  isAble,
}: {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  isSended: boolean;
  footerMessage: string;
  buttonClick: () => void;
  isAble: boolean;
}) => {
  return (
    <div className="w-full flex flex-col gap-y-7 items-start justify-center">
      <div className="font-semibold text-14">{label}</div>
      <div className="w-full h-[50px] border-b border-gray-50 rounded-t-[13px] p-16 flex items-center justify-start gap-x-10">
        <input
          value={value}
          name={name}
          onChange={onChange}
          type="email"
          className="grow text-14 outline-none bg-transparent"
          placeholder="이메일을 입력해주세요"
        />
        <div className="flex items-center justify-end gap-x-10">
          <RoundButton
            type={isSended ? 'incomplete' : isAble ? 'fill' : 'disable'}
            text={isSended ? '전송됨' : '인증번호 전송'}
            fontSize={14}
            onClick={buttonClick}
            isAble={true}
            w={'112px'}
            h={'35px'}
          />
        </div>
      </div>
      <div
        className={`w-full h-[20px] flex items-center justify-between font-medium text-14 ${isError ? 'text-negative' : 'text-main'} ${isSended || isError ? 'visible' : 'invisible'}`}
      >
        <div>{footerMessage}</div>
        <div
          className={`underline underline-offset-4 cursor-pointer ${isSended ? 'visible' : 'invisible'}`}
        >
          인증번호 재전송
        </div>
      </div>
    </div>
  );
};

export default JoinEmailInputContainer;
