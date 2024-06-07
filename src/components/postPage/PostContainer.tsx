import { ReactComponent as Pin } from '../../assets/icons/icon_pin.svg';
import { categoryToKorean } from '../../data/type';
import Editor from '@draft-js-plugins/editor';
import { ReactComponent as Url } from '../../assets/icons/icon_url.svg';
import { ReactComponent as Plane } from '../../assets/icons/icon_plane.svg';
import CommentContainer from './CommentContainer';
import { usePostContainer } from '../../hooks/postPage/usePostContainer';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorContainer from '../common/ErrorContainer';
import { useDateFormat } from '../../hooks/common/useDateFormat';
import createImagePlugin from '@draft-js-plugins/image';
import { getMoldevId } from '../../api/manageLocalStorage';
import RectButton from '../common/RectButton';
import PostRecentContainer from './PostRecentContainer';

const imagePlugin = createImagePlugin();
const plugins = [imagePlugin];

const PostContainer = ({
  moldevId,
  postId,
  isShow,
}: {
  moldevId: string;
  postId: number;
  isShow: boolean;
}) => {
  const myMoldevId = getMoldevId();
  const {
    post,
    postIsLoading,
    postIsError,
    editorState,
    setEditorState,
    onMoveToEdit,
    tryDeletePost,
    blockRendererFn,
  } = usePostContainer(moldevId, postId);
  const date = useDateFormat(post?.postInfo.lastModifiedDate);

  return (
    <div
      className={`w-4/5 h-[95%] flex flex-col items-center justify-start rounded-modal bg-white shadow-md relative ${isShow ? 'translate-y-0' : 'translate-y-[200%]'} transition-all duration-150`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!post ? (
        postIsLoading ? (
          <LoadingSpinner />
        ) : postIsError ? (
          <ErrorContainer />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-20 font-medium text-gray-700">
              게시글이 존재하지 않습니다.
            </div>
          </div>
        )
      ) : (
        <div className="w-full flex flex-col items-center justify-start overflow-y-scroll">
          <div className="w-full flex flex-col items-start justify-start gap-y-16 p-24 border-b border-b-gray-50">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-start gap-x-8">
                <Pin className="h-[16px] w-auto" />
                <div className="text-14 font-medium text-gray-700">
                  {categoryToKorean[post.postInfo.category || 'ACTIVITY']}
                </div>
              </div>
            </div>
            <div className="w-full items-center justify-start text-36 font-bold text-black">
              {post.postInfo.title}
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-start gap-x-6">
                <img
                  src={post.userInfo.profileImgUrl}
                  alt="profile"
                  className="w-[24px] h-[24px] rounded-full"
                />
                <div className="text-18 font-medium text-black">
                  {post.userInfo.nickname}
                </div>
              </div>
              <div className="font-medium text-14 text-gray-700">{`${date} | 조회수 ${post.postInfo.viewCount}`}</div>
            </div>
            {myMoldevId === moldevId && (
              <div className="w-full flex items-center justify-end gap-x-16">
                <RectButton
                  type="fill"
                  text="수정"
                  onClick={() => onMoveToEdit(post.postInfo.id)}
                  h="40px"
                />
                <RectButton
                  type="stroke"
                  text="삭제"
                  onClick={() => {
                    tryDeletePost(post.postInfo.id);
                  }}
                  h="40px"
                />
              </div>
            )}
          </div>
          <div className="w-full grow px-48 py-32 flex flex-col items-center justify-start">
            <div className="editor flex flex-col items-center justify-start w-full h-full">
              <Editor
                plugins={plugins}
                editorState={editorState}
                readOnly={true}
                onChange={setEditorState}
                blockRendererFn={blockRendererFn}
              />
            </div>
          </div>
          <div className="w-full flex itemcen justify-end shrink-0 gap-x-16 px-48 pt-60 pb-36 border-b border-gray-50">
            <button className="flex items-center justify-center px-11 py-9 bg-main/10 rounded-full">
              <Url width={24} height={24} />
            </button>
            <button className="flex items-center justify-center px-11 py-9 bg-main/10 rounded-full">
              <Plane width={24} height={24} />
            </button>
          </div>
          <PostRecentContainer post={post} moldevId={moldevId} />
          <CommentContainer postId={postId} />
        </div>
      )}
    </div>
  );
};

export default PostContainer;
