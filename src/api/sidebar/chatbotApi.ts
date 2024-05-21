import { baseAxios } from '../axiosInstance';

export const getChatbotAnswerApi = async (
  message: string,
  memberId: number,
) => {
  return baseAxios.get(`/chatbots/${memberId}`, {
    params: {
      query: message,
    },
  });
};
