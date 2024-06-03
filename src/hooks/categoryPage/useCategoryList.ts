import { useParams } from 'react-router';
import useModal from '../common/useModal';
import { categoryType } from '../../data/type';

const useCategoryList = () => {
  const { moldevId, categoryName } = useParams();
  const { isShow, childIsShow, onBackgroundClick } = useModal(`/${moldevId}`);

  const changeCategoryType = (category: string): categoryType => {
    if (category === 'activity') {
      return 'ACTIVITY';
    } else if (category === 'project') {
      return 'PROJECT';
    } else if (category === 'awards') {
      return 'AWARDS';
    } else if (category === 'trouble') {
      return 'TROUBLE';
    } else {
      return 'ACTIVITY';
    }
  };
  const realCategoryName = changeCategoryType(categoryName || '');

  return {
    isShow,
    childIsShow,
    onBackgroundClick,
    realCategoryName,
  };
};

export default useCategoryList;
