import ModalBackground from '../components/common/ModalBackground';
import usePostPage from '../hooks/postPage/usePostPage';
import PostContainer from '../components/postPage/PostContainer';

const PostPage = () => {
  const { isShow, childIsShow, onBackgroundClick, postId } = usePostPage();

  return (
    <ModalBackground isShow={isShow} onClick={onBackgroundClick}>
      <PostContainer postId={Number(postId)} isShow={childIsShow} />
    </ModalBackground>
  );
};

export default PostPage;
