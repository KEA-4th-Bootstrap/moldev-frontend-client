import { useParams } from 'react-router';
import { useEffect } from 'react';
import useModal from '../common/useModal';

const usePostPage = () => {
  const { moldevId, postId } = useParams();
  const { isShow, childIsShow, setChildIsShow, onBackgroundClick } =
    useModal(-1);

  useEffect(() => {
    console.log('articleId', postId);
  }, [postId]);

  return {
    isShow,
    childIsShow,
    setChildIsShow,
    onBackgroundClick,
    moldevId,
    postId,
  };
};

export default usePostPage;
