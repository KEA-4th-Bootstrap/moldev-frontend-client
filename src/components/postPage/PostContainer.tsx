import { ReactComponent as Pin } from '../../assets/icons/icon_pin.svg';
import { categoryToKorean } from '../../data/type';
import Editor from '@draft-js-plugins/editor';
import { ReactComponent as Url } from '../../assets/icons/icon_url.svg';
import { ReactComponent as Plane } from '../../assets/icons/icon_plane.svg';
import { ReactComponent as Prev } from '../../assets/icons/icon_prev.svg';
import { ReactComponent as Next } from '../../assets/icons/icon_next.svg';
import RecentListItemContainer from './RecentListItemContainer';
import CommentContainer from './CommentContainer';
import { usePostContainer } from '../../hooks/postPage/usePostContainer';

const PostContainer = ({
  postId,
  isShow,
}: {
  postId: number;
  isShow: boolean;
}) => {
  const { post, editorState, recentList, commentList, setEditorState } =
    usePostContainer(postId);
  return (
    <div
      className={`w-4/5 h-[95%] flex flex-col items-center justify-start rounded-modal bg-white shadow-md relative ${isShow ? 'translate-y-0' : 'translate-y-[200%]'} transition-all duration-150`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!post ? (
        <div>게시글 정보가 없습니다.</div>
      ) : (
        <div className="w-full flex flex-col items-center justify-start overflow-y-scroll">
          <div className="w-full flex flex-col items-start justify-start gap-y-16 p-24 border-b border-b-gray-50">
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-start gap-x-8">
                <Pin className="h-[16px] w-auto" />
                <div className="text-14 font-medium text-gray-700">
                  {categoryToKorean[post.category]}
                </div>
              </div>
            </div>
            <div className="w-full items-center justify-start text-36 font-bold text-black">
              {post.title}
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center justify-start gap-x-6">
                <img
                  src={post.img}
                  alt="profile"
                  className="w-[24px] h-[24px] rounded-full"
                />
                <div className="text-18 font-medium text-black">
                  {post.userName}
                </div>
              </div>
              <div className="font-medium text-14 text-gray-700">{`${post.createdAt} | 조회수 ${post.visit}`}</div>
            </div>
          </div>
          <div className="w-full grow px-48 py-32 flex flex-col items-center justify-start">
            <div className="editor flex flex-col items-center justify-start w-full h-full">
              <Editor
                editorState={editorState}
                readOnly={true}
                onChange={setEditorState}
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
          <div className="w-full flex items-center justify-center border-b border-gray-50">
            <div className="w-1/2 flex flex-col items-start justify-center py-30">
              <div className="w-full flex items-center justify-between">
                <div className="text-20 font-medium">
                  <span className="font-semibold">{`${categoryToKorean[post.category]} `}</span>
                  카테고리의 다른 글
                </div>
                <div className="flex items-center">
                  <Prev width={24} height={24} />
                  <Next width={24} height={24} />
                </div>
              </div>
              <div className="mt-36 w-full flex flex-col items-center justify-center gap-y-10">
                {recentList.map((item, idx) => (
                  <RecentListItemContainer item={item} key={idx} />
                ))}
              </div>
            </div>
          </div>
          <CommentContainer commentList={commentList} />
        </div>
      )}
    </div>
  );
};

export default PostContainer;
