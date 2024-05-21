import { categoryType } from '../../data/type';
import useCategoryListWrapper from '../../hooks/categoryPage/useCategoryListWrapper';
import CategoryListItemContainer from './CategoryListItemContainer';

const CategoryListWrapper = ({
  category,
  isShow,
}: {
  category: categoryType;
  isShow: boolean;
}) => {
  const {
    listItems,
    currentIndex,
    setCurrentIndex,
    outerRef,
    itemDimensions,
    moldevId,
  } = useCategoryListWrapper(category);

  return (
    <div className="w-full grow flex flex-col justify-center items-center">
      <div
        ref={outerRef}
        className={`w-2/3 grow flex flex-col items-center justify-center gap-y-30 py-80 ${isShow ? 'translate-y-0' : 'translate-y-[200%]'} transition-all duration-150`}
      >
        {listItems.length > 0 && itemDimensions.length > 0 && (
          <>
            <div className="w-full flex items-end justify-center gap-x-30">
              {listItems
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
              {listItems
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
        )}
      </div>
      <div
        className="flex items-center justify-center gap-x-32 grow shrink-0"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={currentIndex === 1}
        >
          이전
        </button>
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={currentIndex * 5 >= listItems.length}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default CategoryListWrapper;
