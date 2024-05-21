import React from 'react';

const ChatbotLoadingContainer = () => {
  return (
    <div className="px-16 py-10 rounded-rectButton rounded-tl-none bg-gray-50 flex items-center justify-start gap-x-1 ">
      <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
    </div>
  );
};

export default ChatbotLoadingContainer;
