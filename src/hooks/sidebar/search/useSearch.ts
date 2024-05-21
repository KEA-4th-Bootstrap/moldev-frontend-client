import { useState } from 'react';
import {
  islandListItemType,
  postListItemType,
  searchOptionType,
} from '../../../data/type';
import { dummyIslandList, dummyProject } from '../../../data/dummy';

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [option, setOption] = useState<searchOptionType[]>(['post', 'island']);
  const [postList, setPostList] = useState<postListItemType[]>([]);
  const [islandList, setIslandList] = useState<islandListItemType[]>([]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleOption = (type: searchOptionType) => {
    if (option.includes(type)) {
      setOption(option.filter((item) => item !== type));
    } else {
      setOption([...option, type]);
    }
  };

  const handleOnlyOption = (type: searchOptionType) => {
    setOption([type]);
  };

  const handlePostList = () => {
    setPostList(dummyProject);
  };

  const handleIslandList = () => {
    setIslandList(dummyIslandList);
  };

  const handleSearch = () => {
    if (option.includes('post')) {
      handlePostList();
    }
    if (option.includes('island')) {
      handleIslandList();
    }
  };

  return {
    search,
    handleSearchInput,
    option,
    handleOption,
    postList,
    islandList,
    handleKeydown,
    handleOnlyOption,
  };
};

export default useSearch;
