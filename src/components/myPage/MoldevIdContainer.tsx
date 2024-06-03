import React from 'react';
import RoundButton from '../common/RoundButton';

const MoldevIdContainer = ({
  value,
  onChange,
  isError,
  errorMessage,
  isReadOnly,
  isAble,
  buttonClick,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  errorMessage: string;
  isReadOnly: boolean;
  isAble?: boolean;
  buttonClick?: () => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-y-7 items-start justify-center">
      <div className="font-semibold text-14">몰디브 아이디</div>
      <div
        className={`w-full h-[50px] border-b border-gray-50 ${buttonClick ? 'rounded-t-[13px]' : 'rounded-[13px]'} p-16 flex items-center justify-start gap-x-10 ${isReadOnly ? 'bg-gray-50' : 'bg-white'}`}
      >
        <input
          value={value}
          name="moldevId"
          onChange={onChange}
          type="text"
          className={`grow text-14 ${isReadOnly ? 'text-gray-600' : 'text-black'} outline-none bg-transparent`}
          placeholder="몰디브 아이디를 입력하세요."
          readOnly={isReadOnly}
        />
        {!isReadOnly && (
          <div className="flex items-center justify-end gap-x-10">
            <RoundButton
              type="fill"
              text="중복확인"
              fontSize={14}
              onClick={buttonClick || (() => {})}
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

export default MoldevIdContainer;
