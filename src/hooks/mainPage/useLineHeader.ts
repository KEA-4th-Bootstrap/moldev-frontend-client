import { useEffect, useState } from 'react';
import {
  islandListItemType,
  lineHeaderType,
  postListItemType,
} from '../../data/type';
import { dummyIslandList, dummyProject } from '../../data/dummy';

const useLineHeader = () => {
  const [selected, setSelected] = useState<lineHeaderType>('post');
  const [postList, setPostList] = useState<postListItemType[]>([]);
  const [islandList, setIslandList] = useState<islandListItemType[]>([]);

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
  };
};

export default useLineHeader;
