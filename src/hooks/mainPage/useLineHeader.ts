import { useEffect, useState } from 'react';
import {
  islandListItemType,
  lineHeaderType,
  postListItemType,
} from '../../data/type';
import { dummyIslandList, dummyProject } from '../../data/dummy';
import { useQuery } from 'react-query';
import { getTrendingPostListApi } from '../../api/mainApi';

const useLineHeader = () => {
  const [selected, setSelected] = useState<lineHeaderType>('post');
  const [postList, setPostList] = useState<postListItemType[]>([]);
  const [islandList, setIslandList] = useState<islandListItemType[]>([]);

  const { isLoading: postListIsLoading, error: postListIsError } = useQuery(
    'postList',
    () => getTrendingPostListApi(),
    {
      enabled: selected === 'post',
      refetchOnWindowFocus: false,
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
          });
        }
        setPostList(dataList);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
    },
  );

  useEffect(() => {
    setPostList(dummyProject);
    setIslandList(dummyIslandList);
  }, []);

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
  };
};

export default useLineHeader;
