import { categoryToKorean, categoryType } from '../../data/type';
import CategoryListWrapper from './CategoryListWrapper';

const CategoryListContainer = ({
  isShow,
  category,
}: {
  isShow: boolean;
  category: categoryType;
}) => {
  return (
    <div
      className={`w-full min-h-screen h-full flex flex-col items-center justify-center py-70`}
    >
      <div
        className="shrink-0 pb-24 px-[150px] flex flex-col items-center justify-center border-b-2 border-dark-50"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="text-dark-50 font-bold text-36">
          {categoryToKorean[category]}
        </div>
      </div>
      <CategoryListWrapper category={category} isShow={isShow} />
    </div>
  );
};

export default CategoryListContainer;
