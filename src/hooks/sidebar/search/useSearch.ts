import { useEffect, useState } from 'react';
import {
  postListItemType,
  postListItemUserType,
  searchOptionType,
} from '../../../data/type';
import { useInfiniteQuery } from 'react-query';
import { getSearchIslandApi, getSearchPostApi } from '../../../api/searchApi';

const useSearch = () => {
  const [search, setSearch] = useState('');
  const [option, setOption] = useState<searchOptionType[]>(['post', 'island']);
  const [postList, setPostList] = useState<postListItemType[]>([]);
  const [islandList, setIslandList] = useState<postListItemUserType[]>([]);

  const {
    refetch: refetchSearchPost,
    hasNextPage: searchPostHasNextPage,
    isLoading: searchPostIsLoading,
    isError: searchPostIsError,
    fetchNextPage: fetchNextPost,
    isFetchingNextPage: searchPostIsFetchingNextPage,
  } = useInfiniteQuery(
    ['searchPost', search],
    ({ pageParam = 0 }) => getSearchPostApi(search, pageParam, 10),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.data.postInfo.pageInfo.hasNextPage) {
          return lastPage.data.data.postInfo.pageInfo.pageNumber + 1;
        }
        return undefined;
      },
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log('포스트 검색 성공 --> ', data);
        // console.log('포스트 검색 성공 --> ', data.pageParams);
        if (data.pages) {
          const postList = data.pages.map((page) => {
            const postListItems: postListItemType[] = [];
            for (let i = 0; i < page.data.data.postInfo.postList.length; i++) {
              const item: postListItemType = {
                postInfo: page.data.data.postInfo.postList[i],
                userInfo: page.data.data.userInfo.userList[i],
              };
              postListItems.push(item);
            }

            return postListItems;
          });
          setPostList(postList.flat());
        }
      },
      onError: (error) => {
        console.error('포스트 검색 실패 --> ', error);
      },
    },
  );

  useEffect(() => {
    console.log('hasNextPost : ', searchPostHasNextPage);
  }, [searchPostHasNextPage]);

  const {
    refetch: refetchSearchIsland,
    hasNextPage: searchIslandHasNextPage,
    isLoading: searchIslandIsLoading,
    isError: searchIslandIsError,
    fetchNextPage: fetchNextIsland,
    isFetchingNextPage: searchIslandIsFetchingNextPage,
  } = useInfiniteQuery(
    ['searchIsland', search],
    ({ pageParam = 0 }) => getSearchIslandApi(search, pageParam, 10),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.data.data.pageInfo.hasNextPage) {
          return lastPage.data.data.pageInfo.pageNumber + 1;
        }
        return undefined;
      },
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log('섬 검색 성공 --> ', data);
        if (data.pages) {
          const island = data.pages.map((page) => page.data.data.searchList);
          setIslandList(island.flat());
        }
      },
      onError: (error) => {
        console.error('섬 검색 실패 --> ', error);
      },
    },
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setPostList([]);
      setIslandList([]);
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
    console.log('포스트 리스트 불러오기');
    refetchSearchPost();
  };

  const handleIslandList = () => {
    refetchSearchIsland();
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
    refetchSearchPost,
    searchPostHasNextPage,
    searchPostIsLoading,
    searchPostIsError,
    fetchNextPost,
    searchPostIsFetchingNextPage,
    refetchSearchIsland,
    searchIslandHasNextPage,
    searchIslandIsLoading,
    searchIslandIsError,
    fetchNextIsland,
    searchIslandIsFetchingNextPage,
  };
};

export default useSearch;
