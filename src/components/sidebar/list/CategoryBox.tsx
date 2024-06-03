import {
  categoryToKorean,
  categoryType,
  postListItemUserType,
} from '../../../data/type';
import SearchListFooter from '../search/SearchListFooter';
import SearchResultPostContainer from '../search/SearchResultPostContainer';
import { useListCategoryBox } from '../../../hooks/sidebar/useListCategoryBox';
import SearchResultPostSkeleton from '../search/SearchResultPostSkeleton';
import ErrorContainer from '../../common/ErrorContainer';
import EmptyContainer from '../../common/EmptyContainer';

const CategoryBox = ({
  userInfo,
  category,
}: {
  userInfo: postListItemUserType;
  category: categoryType;
}) => {
  const { listIsLoading, listIsEerror, listData } = useListCategoryBox(
    userInfo.moldevId,
    category,
  );

  return (
    <div className="w-full flex flex-col gap-y-16 pb-16 border-b border-gray-50 px-16 py-4">
      <div className="font-medium text-12 text-gray-600">
        {categoryToKorean[category]}
      </div>
      <div className="w-full flex flex-col gap-10 items-start justify-start">
        {!listData ? (
          listIsLoading ? (
            <>
              <SearchResultPostSkeleton />
              <SearchResultPostSkeleton />
            </>
          ) : listIsEerror ? (
            <ErrorContainer />
          ) : (
            <div>알 수 없는 에러가 발생하였습니다.</div>
          )
        ) : listData.length < 1 ? (
          <EmptyContainer />
        ) : (
          listData.map((post) => (
            <SearchResultPostContainer
              key={post.id}
              item={post}
              moldevId={userInfo.moldevId}
              userName={userInfo.nickname}
              profileImage={userInfo.profileImgUrl}
            />
          ))
        )}
      </div>
      <SearchListFooter text={categoryToKorean[category]} onClick={() => {}} />
    </div>
  );
};

export default CategoryBox;
