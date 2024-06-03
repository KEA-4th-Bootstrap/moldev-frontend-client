import { useEffect, useState } from 'react';
import { messageType } from '../../../data/type';
import { useMutation } from 'react-query';
import { postChatbotApi } from '../../../api/chatbotApi';
import useAuthStore from '../../../store/useAuthStore';

const useChatbot = (moldevId: string | null) => {
  const { isLoggedIn } = useAuthStore();
  const [messages, setMessages] = useState<messageType[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const {
    mutate: postChatbot,
    isLoading,
    isError,
  } = useMutation(() => postChatbotApi(moldevId || '', inputMessage), {
    onSuccess: (data) => {
      console.log('챗봇 포스트 성공 --> ', data);
      setMessages((prev) => [
        ...prev,
        {
          messageId: prev.length,
          isBot: true,
          message: data.data.data.message,
        },
      ]);
    },
    onError: (error) => {
      console.log('챗봇 포스트 실패 --> ', error);
    },
  });
  // const { data, isLoading, isFetching, error, refetch } = useQuery(
  //   'chatbot',
  //   () => postChatbotApi(moldevId || '', inputMessage),
  //   {
  //     enabled: moldevId !== null && inputMessage !== '' && isLoggedIn,
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //     onSuccess: (data) => {
  //       setMessages((prev) => [
  //         ...prev,
  //         { messageId: prev.length, isBot: true, message: data.data.message },
  //       ]);
  //     },
  //   },
  // );

  const handleSendMessage = () => {
    if (inputMessage === '') return;
    setMessages((prev) => [
      ...prev,
      { messageId: prev.length, isBot: false, message: inputMessage },
    ]);
    setInputMessage('');
    postChatbot();
  };

  useEffect(() => {
    console.log('Check API Response');
    console.log(isLoading);
    console.log(isError);
  }, [isLoading, isError]);

  return {
    messages,
    inputMessage,
    setInputMessage,
    handleSendMessage,
    isLoading,
    isError,
    isLoggedIn,
  };
};

export default useChatbot;
