import React from 'react';

const BotMessageWrapper = ({ message }: { message: string }) => {
  return (
    <div className="px-16 py-10 rounded-rectButton rounded-tl-none bg-gray-50 text-14 font-medium">
      {message}
    </div>
  );
};

export default BotMessageWrapper;
