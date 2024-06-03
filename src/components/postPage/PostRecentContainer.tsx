import React from 'react';
import { categoryToKorean, postListItemType } from '../../data/type';
import ErrorContainer from '../common/ErrorContainer';
import { ReactComponent as Prev } from '../../assets/icons/icon_prev.svg';
import { ReactComponent as Next } from '../../assets/icons/icon_next.svg';
import RecentListItemContainer from './RecentListItemContainer';
import { usePostRecentList } from '../../hooks/postPage/usePostRecentList';
import LoadingSpinner from '../common/LoadingSpinner';

const PostRecentContainer = ({
  post,
  moldevId,
}: {
  post: postListItemType | null;
  moldevId: string;
}) => {
  const { data, isLoading, isError } = usePostRecentList(post, moldevId);
  return !post ? (
    <ErrorContainer />
  ) : (
    <div className="w-full flex items-center justify-center border-b border-gray-50">
      <div className="w-1/2 flex flex-col items-start justify-center py-30">
        <div className="w-full flex items-center justify-between">
          <div className="text-20 font-medium">
            <span className="font-semibold">{`${categoryToKorean[post.postInfo.category || 'ACTIVITY']} `}</span>
            카테고리의 다른 글
          </div>
          <div className="flex items-center">
            <Prev width={24} height={24} />
            <Next width={24} height={24} />
          </div>
        </div>
        <div className="mt-36 w-full flex flex-col items-center justify-center gap-y-10">
          {!data ? (
            isLoading ? (
              <LoadingSpinner />
            ) : isError ? (
              <ErrorContainer />
            ) : (
              <div className="text-20 font-medium text-gray-700">
                게시글이 존재하지 않습니다.
              </div>
            )
          ) : data.length < 1 ? (
            <div className="text-20 font-medium text-gray-700">
              게시글이 존재하지 않습니다.
            </div>
          ) : (
            data.map((item) => (
              <RecentListItemContainer
                moldevId={moldevId}
                item={item}
                key={item.id}
                isActive={item.id === post.postInfo.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostRecentContainer;
