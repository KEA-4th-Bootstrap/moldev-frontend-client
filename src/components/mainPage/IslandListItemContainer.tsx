import { islandListItemType } from '../../data/type';
import useRouteNavigate from '../../hooks/common/useRouteNavigate';

const IslandListItemContainer = ({ item }: { item: islandListItemType }) => {
  const { onClick } = useRouteNavigate(`/${item.moldevId}`);
  return (
    <div
      className="grow flex flex-col items-center justify-center rounded-card gap-y-10 py-20 bg-white hover:bg-main/10 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full flex items-center justify-start px-14 gap-x-12">
        <img
          className="w-[52px] h-[52px] rounded-full"
          src={item.userImg}
          alt="user"
        />
        <div className="grow flex flex-col items-start justify-center">
          <div className="flex items-center justify-start text-14 font-medium text-gray-400 gap-x-2">
            <div>{item.userName}</div>
            <div>님의</div>
          </div>
          <div className="flex items-center justify-start text-20 gap-x-3">
            <div className="font-bold">{item.islandName}</div>
            <div className="font-normal">섬</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-y-6 px-14">
        <div className="w-full flex justify-between items-center text-12 font-medium text-gray-400">
          <div>오늘의 방문자</div>
          <div>{item.visit}명</div>
        </div>
        <div className="w-full flex justify-between items-center text-12 font-medium text-gray-400">
          <div>최근 업데이트</div>
          <div>{item.updated}</div>
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-gray-50" />
      <div className="w-full px-16 flex flex-col items-center justify-center gap-y-3">
        {item.articles.map((article) => (
          <div
            className="w-full flex items-center justify-between"
            key={article.id}
          >
            <div className="text-14 font-semibold truncate">
              {article.title}
            </div>
            <div className="text-12 font-normal">{article.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslandListItemContainer;
