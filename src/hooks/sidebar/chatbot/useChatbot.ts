import { useEffect, useState } from 'react';
import { messageType } from '../../../data/type';
import { useQuery } from 'react-query';
import { getChatbotAnswerApi } from '../../../api/sidebar/chatbotApi';

const useChatbot = (memberId: number) => {
  const [messages, setMessages] = useState<messageType[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    'chatbot',
    () => getChatbotAnswerApi(inputMessage, memberId),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onSuccess: (data) => {
        setMessages((prev) => [
          ...prev,
          { messageId: prev.length, isBot: true, message: data.data.message },
        ]);
      },
    },
  );

  const handleSendMessage = () => {
    if (inputMessage === '') return;
    setMessages((prev) => [
      ...prev,
      { messageId: prev.length, isBot: false, message: inputMessage },
    ]);
    setInputMessage('');
    refetch();
  };

  useEffect(() => {
    console.log('Check API Response');
    console.log(data);
    console.log(isLoading);
    console.log(error);
  }, [data, isLoading, error]);

  return {
    messages,
    inputMessage,
    setInputMessage,
    handleSendMessage,
    isLoading,
    isFetching,
  };
};

export default useChatbot;
