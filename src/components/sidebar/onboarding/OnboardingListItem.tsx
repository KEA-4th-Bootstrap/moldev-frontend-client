import React from 'react';

const OnboardingListItem = ({
  url,
  title,
  text,
}: {
  url: string;
  title: string;
  text: string;
}) => {
  return (
    <div className="w-full flex items-center justify-start border-b-[0.5px] gap-x-[25px] pl-[25px] py-18">
      <div className="w-[74px] h-[74px] flex items-center justify-center">
        <img src={url} alt={title} />
      </div>
      <div className="grow pr-16 flex flex-col items-start justify-center gap-y-5">
        <div className="font-semibold text-14">{title}</div>
        <div className="w-full text-12 break-keep">{text}</div>
      </div>
    </div>
  );
};

export default OnboardingListItem;
