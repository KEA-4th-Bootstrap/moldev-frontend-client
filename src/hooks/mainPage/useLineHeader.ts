import {
  lineHeaderType,
  postListItemType,
  trendIslandType,
} from '../../data/type';
import { useQuery } from 'react-query';
import {
  getTrendingIslandListApi,
  getTrendingPostListApi,
} from '../../api/mainApi';
import { useState } from 'react';

const useLineHeader = () => {
  const [selected, setSelected] = useState<lineHeaderType>('post');
  const [postList, setPostList] = useState<postListItemType[]>([]);

  const { isLoading: postListIsLoading, error: postListIsError } = useQuery(
    'postList',
    () => getTrendingPostListApi(),
    {
      enabled: selected === 'post',
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      onSuccess: (data) => {
        console.log('data : ', data);
        console.log(data.data.data.postInfo);
        console.log(postListIsLoading);
        console.log(postListIsError);
        const dataList: postListItemType[] = [];
        for (let i = 0; i < data.data.data.postInfo.postList.length; i++) {
          dataList.push({
            postInfo: {
              ...data.data.data.postInfo.postList[i].postInfo,
            },
            userInfo: {
              ...data.data.data.userInfo.userList[i],
            },
            viewCount: data.data.data.postInfo.postList[i].redisViewCount,
          });
        }
        setPostList(dataList);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
    },
  );

  const {
    isLoading: islandListIsLoading,
    error: islandListIsError,
    data: islandList,
  } = useQuery<trendIslandType[]>(
    'islandList',
    () =>
      getTrendingIslandListApi().then((res) => {
        return res.data.data.trendIslands;
      }),
    {
      enabled: selected === 'island',
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log('트렌딩 섬 받아오기 성공 --> ', data);
      },
      onError: (error) => {
        console.log('트렌딩 섬 받아오기 실패 --> ', error);
      },
    },
  );

  const onClickPost = () => {
    setSelected('post');
  };

  const onClickIsland = () => {
    setSelected('island');
  };

  return {
    postList,
    islandList,
    selected,
    onClickPost,
    onClickIsland,
    postListIsLoading,
    postListIsError,
    islandListIsLoading,
    islandListIsError,
  };
};

export default useLineHeader;
