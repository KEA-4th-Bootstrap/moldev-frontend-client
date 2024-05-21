import React from 'react';

const UserMessageWrapper = ({ message }: { message: string }) => {
  return (
    <div className="px-16 py-10 rounded-rectButton rounded-tr-none bg-main text-white text-14 font-medium">
      {message}
    </div>
  );
};

export default UserMessageWrapper;
