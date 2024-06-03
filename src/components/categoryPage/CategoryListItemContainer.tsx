import { postListItemPostType } from '../../data/type';
import useRouteNavigate from '../../hooks/common/useRouteNavigate';

const CategoryListItemContainer = ({
  item,
  moldevId,
  width,
  height,
}: {
  item: postListItemPostType;
  moldevId: string;
  width: number;
  height: number;
}) => {
  const { onClick } = useRouteNavigate(`/${moldevId}/${item.id}`);

  return (
    <div
      style={{ width: width, height: height }}
      className={`rounded-md flex flex-col items-start justify-center hover:border-white hover:border-4 shadow-md transition-all duration-100 ease-in-out cursor-pointer overflow-hidden`}
      onClick={onClick}
    >
      <div className="shrink w-full grow rounded-t-md overflow-hidden">
        <img
          className="shrink w-full h-full object-cover"
          src={item.thumbnail}
          alt={item.title}
        />
      </div>
      <div className="w-full flex flex-col items-start justify-between bg-white px-16 py-13">
        <div className="shrink-0 w-full font-bold text-16">{item.title}</div>
        <div className={`shrink-0 w-full grow text-14 line-clamp-1`}>
          {item.content}
        </div>
        <div className="shrink-0 w-full flex items-center justify-end text-12 text-gray-800">{`조회수 ${item.viewCount}회 | ${item.lastModifiedDate}`}</div>
      </div>
    </div>
  );
};

export default CategoryListItemContainer;
