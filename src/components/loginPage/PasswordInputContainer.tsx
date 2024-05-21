import { ChangeEvent } from 'react';
import { ReactComponent as Completed } from '../../assets/icons/icon_check_completed.svg';
import { ReactComponent as Incompleted } from '../../assets/icons/icon_check_incompleted.svg';

const PasswordInputContainer = ({
  label,
  value,
  name,
  onChange,
  isError,
  errorMessage,
  options,
}: {
  label: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  errorMessage: string;
  options: {
    isComplete: boolean;
    text: string;
  }[];
}) => {
  return (
    <div className="w-full flex flex-col gap-y-7 items-start justify-center">
      <div className="w-full flex items-center justify-between">
        <div className="font-semibold text-14">{label}</div>
        <div className="flex items-center justify-end gap-x-10">
          {options.map((option, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center gap-x-4 font-medium text-14 ${
                option.isComplete ? 'text-main' : 'text-disable'
              }`}
            >
              {option.isComplete ? (
                <Completed width={14} height={14} />
              ) : (
                <Incompleted width={14} height={14} />
              )}
              <div>{option.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[50px] border-b border-gray-50 rounded-t-[13px] p-16 flex items-center justify-start gap-x-10">
        <input
          value={value}
          name={name}
          onChange={onChange}
          type="password"
          className="grow text-14 outline-none bg-transparent"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>
      <div
        className={`w-full font-medium text-14 text-negative ${isError ? 'visible' : 'invisible'}`}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default PasswordInputContainer;
