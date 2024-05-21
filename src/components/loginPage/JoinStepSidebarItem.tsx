import React from 'react';

const JoinStepSidebarItem = ({
  step,
  title,
  isActive,
}: {
  step: number;
  title: string;
  isActive: boolean;
}) => {
  return (
    <div className="flex items-center justify-start gap-x-6">
      <div
        className={`w-[28px] h-[28px] flex items-center justify-center rounded-full font-bold text-14 ${isActive ? 'bg-main text-white shadow-step' : 'bg-white border border-main text-main'}`}
      >
        {step}
      </div>
      <div
        className={`font-semibold text-14 ${isActive ? 'text-main' : 'text-disable'}`}
      >
        {title}
      </div>
    </div>
  );
};

export default JoinStepSidebarItem;
