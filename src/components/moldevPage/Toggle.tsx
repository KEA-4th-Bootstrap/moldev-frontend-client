import { ReactNode, useState } from 'react';

const Toggle = ({
  type,
  icon,
  text,
  isItemHover,
  onClick,
  canClick,
}: {
  type: 'default' | 'main';
  icon: ReactNode;
  text?: string;
  isItemHover: boolean;
  onClick: () => void;
  canClick: boolean;
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`shrink-0 flex flex-nowrap items-center justify-start gap-x-10 px-11 py-9 rounded-full ${type === 'default' ? 'bg-dark-300/70' : 'bg-main/20'} ${canClick ? 'cursor-pointer' : 'cursor-default'} overflow-hidden h-[42px]  ${isHover || isItemHover ? 'animate-grow' : 'w-[46px]'} transition-all duration-100 ease-in-out`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
    >
      <div className="shrink-0 w-[24px] h-[24px]">{icon}</div>
      {text && (
        <div
          className={`shrink-0 text-16 pr-[3px] font-medium ${type === 'default' ? 'text-white' : 'text-main'}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Toggle;
