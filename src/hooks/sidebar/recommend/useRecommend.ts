import { useEffect, useState } from 'react';
import { recommendIslandType } from '../../../data/type';

const useRecommend = (member: number) => {
  console.log(member);
  const [recommend, setRecommend] = useState<recommendIslandType[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>('');

  // const fetchRecommend = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getRecommend(member);
  //     setRecommend(response.data);
  //   } catch (e) {
  //     setError(e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchRecommend();
  // }, []);

  const handleRecommend = () => {
    setRecommend([
      {
        percentage: 80,
        island: {
          moldevId: '1',
          userName: '김지수',
          userImg:
            'https://mblogthumb-phinf.pstatic.net/MjAyMzA2MjRfMTgy/MDAxNjg3NTk3OTQwMDM3.akypUeu7K637Dtfsi0HrMUe41z7PraCMamDhwMih73sg.B7SS-VPT2BA7VgIcf6Boqnk0wnGY7z1kF_5h02Pj4oQg.JPEG.didu22/1687580283569.jpg?type=w800',
          islandName: '포토샵',
          visit: 28,
          updated: '2021.07.01',
          articles: [
            {
              id: 1,
              title: '포토샵 기초',
              createdAt: '2021.07.01',
            },
            {
              id: 2,
              title: '포토샵 심화',
              createdAt: '2021.07.01',
            },
          ],
        },
      },
    ]);
  };

  useEffect(() => {
    handleRecommend();
  }, []);

  return { recommend };
};

export default useRecommend;
