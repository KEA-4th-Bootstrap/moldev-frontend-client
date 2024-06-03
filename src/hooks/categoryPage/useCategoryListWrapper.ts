import { useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import {
  ItemDimensions,
  categoryType,
  postListItemPostType,
} from '../../data/type';
import { MissionControl } from './MissionControl';
import { useQuery } from 'react-query';
import { getMissionControl } from '../../api/postApi';

const useCategoryListWrapper = (category: categoryType) => {
  const { moldevId } = useParams();
  const outerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [itemDimensions, setItemDimensions] = useState<ItemDimensions[][]>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    console.log('list wrapper moldevId', moldevId);
  }, [moldevId]);

  useEffect(() => {
    if (!outerRef.current) return;
    // outerRef size
    const { width, height } = outerRef.current.getBoundingClientRect();
    // console.log('outerRef', outerRef.current.className);
    // console.log('outerRef', width, height);
    setWidth(width);
    setHeight(height);
  }, [outerRef, outerRef.current?.onresize]);

  useEffect(() => {
    if (!width || !height) return;

    const itemDimensions = MissionControl(width, height, 5, 32);
    console.log('itemDimensions', itemDimensions);
    setItemDimensions(itemDimensions);
  }, [width, height]);

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPage) return;
    setPage(page);
  };

  // const handleOtherPageChange = (diff: number) => {
  //   setPage((prev) => prev + diff);
  // };

  const {
    data: categoryData,
    isError,
    isLoading,
  } = useQuery<postListItemPostType[]>(
    ['category', category, page],
    () =>
      getMissionControl(moldevId || '', category, page, 5).then((res) => {
        console.log(`미션 컨트롤 ${category} 성공 --> `, res.data.data.data);
        setTotalPage(res.data.data.data.pageInfo.totalPages);
        return res.data.data.data.postList;
      }),
    {
      enabled: !!category && !!moldevId,
      onSuccess: (data) => {
        console.log(`미션 컨트롤 ${category} 성공 성공 --> `, data);
      },
      onError: (error) => {
        console.log(`미션 컨트롤 ${category} 실패 --> `, error);
      },
    },
  );

  return {
    outerRef,
    itemDimensions,
    moldevId,
    categoryData,
    isError,
    isLoading,
    page,
    totalPage,
    handlePageChange,
    // handleOtherPageChange,
  };
};

export default useCategoryListWrapper;
