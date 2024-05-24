import React from 'react';

const InputContainer = ({
  value,
  onChange,
  label,
  placeholder,
  type,
  isError,
  errorMsg,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  type: string;
  isError: boolean;
  errorMsg: string;
}) => {
  return (
    <div className="w-full flex flex-col gap-y-7 items-start justify-center">
      <div className="font-semibold text-14">{label}</div>
      <div className="w-full h-[50px] bg-[#F4F8FC] rounded-[13px] p-16 flex items-center justify-start gap-x-10">
        <input
          value={value}
          onChange={onChange}
          type={type}
          className="grow text-14 outline-none bg-transparent"
          placeholder={placeholder}
        />
      </div>
      <div
        className={`w-full h-[20px] font-medium text-14 text-negative ${isError ? 'visible' : 'invisible'}`}
      >
        {errorMsg}
      </div>
    </div>
  );
};

export default InputContainer;
