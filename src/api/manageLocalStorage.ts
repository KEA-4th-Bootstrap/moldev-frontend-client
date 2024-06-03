export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

export const setMoldevId = (moldevId: string) => {
  localStorage.setItem('moldevId', moldevId);
};

export const getMoldevId = () => {
  return localStorage.getItem('moldevId');
};

export const removeMoldevId = () => {
  localStorage.removeItem('moldevId');
};

export const setNickname = (nickname: string) => {
  localStorage.setItem('nickname', nickname);
};

export const getNickname = () => {
  return localStorage.getItem('nickname');
};

export const removeNickname = () => {
  localStorage.removeItem('nickname');
};
