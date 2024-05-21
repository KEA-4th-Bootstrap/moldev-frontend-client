export const setAccessToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

export const setMemberId = (memberId: number) => {
  localStorage.setItem('memberId', memberId.toString());
};

export const getMemberId = () => {
  return Number(localStorage.getItem('memberId'));
};

export const removeMemberId = () => {
  localStorage.removeItem('memberId');
};
