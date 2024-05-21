import React from 'react';
import useCategoryList from '../hooks/categoryPage/useCategoryList';
import ModalBackground from '../components/common/ModalBackground';
import CategoryListContainer from '../components/categoryPage/CategoryListContainer';

const CategoryPage = () => {
  const { isShow, childIsShow, onBackgroundClick, categoryName } =
    useCategoryList();
  return (
    <ModalBackground isShow={isShow} onClick={onBackgroundClick}>
      <CategoryListContainer
        isShow={childIsShow}
        category={
          categoryName === 'activity'
            ? 'activity'
            : categoryName === 'project'
              ? 'project'
              : categoryName === 'awards'
                ? 'awards'
                : categoryName === 'trouble'
                  ? 'trouble'
                  : 'activity'
        }
      />
    </ModalBackground>
  );
};

export default CategoryPage;
