import { categoryType } from '../../data/type';
import useCategoryListWrapper from '../../hooks/categoryPage/useCategoryListWrapper';
import EmptyContainer from '../common/EmptyContainer';
import ErrorContainer from '../common/ErrorContainer';
import LoadingSpinner from '../common/LoadingSpinner';
import CategoryListItemContainer from './CategoryListItemContainer';

const CategoryListWrapper = ({
  category,
  isShow,
}: {
  category: categoryType;
  isShow: boolean;
}) => {
  const {
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
  } = useCategoryListWrapper(category);

  return (
    <div className="w-full grow flex flex-col justify-center items-center">
      <div
        ref={outerRef}
        className={`w-2/3 grow flex flex-col items-center justify-center gap-y-30 py-80 ${isShow ? 'translate-y-0' : 'translate-y-[200%]'} transition-all duration-150`}
      >
        {!categoryData ? (
          isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <ErrorContainer />
          ) : (
            <div className="w-full flex items-center justify-center">
              알 수 없는 오류가 발생했습니다.
            </div>
          )
        ) : categoryData.length < 1 ? (
          <EmptyContainer />
        ) : (
          itemDimensions.length > 0 && (
            <>
              <div className="w-full flex items-end justify-center gap-x-30">
                {categoryData
                  .slice(0, itemDimensions[0].length)
                  .map((item, index) => (
                    <CategoryListItemContainer
                      key={item.id}
                      item={item}
                      moldevId={moldevId || ''}
                      width={itemDimensions[0][index].width}
                      height={itemDimensions[0][index].height}
                    />
                  ))}
              </div>
              <div className="w-full flex items-start justify-center gap-x-30">
                {categoryData
                  .slice(itemDimensions[0].length, 5)
                  .map((item, index) => (
                    <CategoryListItemContainer
                      key={item.id}
                      item={item}
                      moldevId={moldevId || ''}
                      width={itemDimensions[1][index].width}
                      height={itemDimensions[1][index].height}
                    />
                  ))}
              </div>
            </>
          )
        )}
      </div>
      <div
        className="flex items-center justify-center gap-x-32 grow shrink-0"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          className="text-dark-50 py-8 px-16 rounded-block bg-white/50"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          이전
        </button>
        <button
          className="text-dark-50 py-8 px-16 rounded-block bg-white/50"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPage}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default CategoryListWrapper;
