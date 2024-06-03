import React from 'react';
import useCategoryList from '../hooks/categoryPage/useCategoryList';
import ModalBackground from '../components/common/ModalBackground';
import CategoryListContainer from '../components/categoryPage/CategoryListContainer';

const CategoryPage = () => {
  const { isShow, childIsShow, onBackgroundClick, realCategoryName } =
    useCategoryList();
  return (
    <ModalBackground isShow={isShow} onClick={onBackgroundClick}>
      <CategoryListContainer isShow={childIsShow} category={realCategoryName} />
    </ModalBackground>
  );
};

export default CategoryPage;
