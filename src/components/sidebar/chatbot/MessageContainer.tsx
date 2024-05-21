import React from 'react';
import BotMessageWrapper from './BotMessageWrapper';
import UserMessageWrapper from './UserMessageWrapper';

const MessageContainer = ({
  isBot = false,
  message,
}: {
  isBot?: boolean;
  message: string;
}) => {
  return (
    <div
      className={`w-full flex items-center ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      {isBot ? (
        <BotMessageWrapper message={message} />
      ) : (
        <UserMessageWrapper message={message} />
      )}
    </div>
  );
};

export default MessageContainer;
