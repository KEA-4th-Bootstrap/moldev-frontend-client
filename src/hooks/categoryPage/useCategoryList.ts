import { useParams } from 'react-router';
import useModal from '../common/useModal';

const useCategoryList = () => {
  const { moldevId, categoryName } = useParams();
  const { isShow, childIsShow, onBackgroundClick } = useModal(`/${moldevId}`);

  return { isShow, childIsShow, onBackgroundClick, categoryName };
};

export default useCategoryList;
