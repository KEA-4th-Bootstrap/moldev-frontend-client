import { authAxios } from './axiosInstance';

export const postChatbotApi = async (moldevId: string, query: string) => {
  return authAxios.post('/api/chatbot', {
    moldevId: moldevId,
    query: query,
  });
};
