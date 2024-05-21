import { ReactComponent as Info } from '../../assets/icons/icon_info_main.svg';
import { ReactComponent as Send } from '../../assets/icons/icon_send.svg';
import ChatbotLoadingContainer from '../../components/sidebar/chatbot/ChatbotLoadingContainer';
import MessageContainer from '../../components/sidebar/chatbot/MessageContainer';
import useChatbot from '../../hooks/sidebar/chatbot/useChatbot';

const ChatbotPage = () => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    handleSendMessage,
    isLoading,
    isFetching,
  } = useChatbot(99);
  return (
    <div className="grow h-full flex flex-col items-start justify-start">
      <div className="w-full mt-70 px-16 text-28 flex flex-col gap-y-2">
        <div className="flex items-center justify-start gap-x-6">
          <div className="font-bold">챗봇</div>
          <div>님의</div>
        </div>
        <div className="flex items-center justify-start gap-x-6">
          <div className="font-bold">몰디브</div>
          <div>섬에 대해 알아보세요.</div>
        </div>
      </div>
      <div className="w-full px-16 py-30 border-b-[0.5px] border-gray-100">
        <div className="w-full p-10 rounded-lg bg-info flex items-start justify-start gap-x-8">
          <Info width={18} height={18} />
          <div className="text-14 text-gray-800">
            챗봇 검색은 이 섬에 특화된 검색입니다.
            <br />
            몰데브의 모든 글에 대한 검색은 전체 검색을 이용해주세요.
          </div>
        </div>
      </div>
      <div className="w-full grow flex flex-col p-16 gap-y-8">
        {messages.map((message) => (
          <MessageContainer
            key={message.messageId}
            isBot={message.isBot}
            message={message.message}
          />
        ))}
        {isLoading || (isFetching && <ChatbotLoadingContainer />)}
      </div>
      <div className="w-full flex items-center justify-start px-16 pt-20 pb-30 gap-x-15 bg-white border-t-[0.5px] border-gray-100">
        <input
          className="grow px-16 py-12 rounded-[40px] bg-gray-50 outline-none"
          type="text"
          placeholder="메세지를 입력하세요"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          className="w-[40px] h-[40px] rounded-full p-10 bg-main"
          onClick={handleSendMessage}
        >
          <Send width={20} height={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
