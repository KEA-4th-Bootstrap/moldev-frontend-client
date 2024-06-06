import dayjs from 'dayjs';
import { trendIslandType } from '../../data/type';
import { useNavigate } from 'react-router-dom';

export const useIslandListItemContainer = (item: trendIslandType) => {
  const navigate = useNavigate();
  const userInfo =
    item.userInfo.trendingMembersResponseDtos[0].memberProfileResponseDto;
  const todayVisit =
    item.userInfo.trendingMembersResponseDtos[0].redisViewCount;
  const changeDateFormat = (date: string) => {
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

  const onClick = () => {
    navigate(`/${userInfo.moldevId}`, {
      state: { nickname: userInfo.nickname, islandName: userInfo.islandName },
    });
  };

  return { userInfo, todayVisit, changeDateFormat, onClick };
};
