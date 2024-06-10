import React from 'react';

const ReportProcessItem = ({
  isClicked,
  text,
  onClick,
}: {
  isClicked: boolean;
  text: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`w-full flex items-center justify-start ${isClicked ? 'font-semibold text-black' : 'font-normal text-gray-600'} cursor-pointer`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {text}
    </div>
  );
};

export default ReportProcessItem;
