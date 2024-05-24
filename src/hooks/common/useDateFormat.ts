import dayjs from 'dayjs';

export const useDateFormat = (date: string | undefined) => {
  if (!date) return '';
  const parsedServerDate = dayjs(date);
  const currentDate = dayjs();

  // 날짜 차이 계산
  const differenceInDays = currentDate.diff(parsedServerDate, 'day');

  return differenceInDays < 1
    ? '오늘'
    : differenceInDays < 2
      ? '어제'
      : differenceInDays < 7
        ? `${differenceInDays}일 전`
        : parsedServerDate.format('YYYY.MM.DD');
};
