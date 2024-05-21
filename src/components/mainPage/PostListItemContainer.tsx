import { postListItemType } from '../../data/type';
import useRouteNavigate from '../../hooks/common/useRouteNavigate';

const PostListItemContainer = ({ item }: { item: postListItemType }) => {
  const { onClick } = useRouteNavigate(`/${item.moldevId}/${item.id}`);

  return (
    <div
      className="grow h-[300px] flex flex-col items-center justify-center rounded-card gap-y-10 bg-white hover:bg-main/10 cursor-pointer"
      onClick={onClick}
    >
      <div className="shrink-0 h-[120px] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-t-card"
          src={item.img}
          alt="article"
        />
      </div>
      <div className="w-full grow flex flex-col justify-between items-start px-13">
        <div className="w-full flex flex-col justify-start items-start gap-y-6">
          <div className="w-full text-16 font-bold line-clamp-1">
            {item.title}
          </div>
          <div className="w-full text-14 font-normal line-clamp-3">
            {item.content}
          </div>
        </div>
        <div className="text-12 font-normal text-gray-300">{`${item.createdAt} ∙ ${item.visit}`}</div>
      </div>
      <div className="shrink-0 w-full flex items-center justify-start px-13 py-10 gap-x-8 border-t-[0.5px] border-gray-100">
        <img
          className="w-[20px] h-[20px] object-cover rounded-full"
          src={item.userImg}
          alt="user"
        />
        <div className="font-medium text-12">{item.userName}</div>
      </div>
    </div>
  );
};

export default PostListItemContainer;
