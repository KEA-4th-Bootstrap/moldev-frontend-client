import { trendIslandType } from '../../data/type';
import { useIslandListItemContainer } from '../../hooks/mainPage/useIslandListItemContainer';

const IslandListItemContainer = ({ item }: { item: trendIslandType }) => {
  const { userInfo, todayVisit, changeDateFormat, onClick } =
    useIslandListItemContainer(item);
  return (
    <div
      className="grow flex flex-col items-center justify-start rounded-card gap-y-10 py-20 bg-white hover:bg-main/10 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-full flex items-center justify-start px-14 gap-x-12">
        <img
          className="w-[52px] h-[52px] rounded-full"
          src={userInfo.profileImgUrl}
          alt="user"
        />
        <div className="grow flex flex-col items-start justify-center">
          <div className="flex items-center justify-start text-14 font-medium text-gray-400 gap-x-2">
            <div>{userInfo.nickname}</div>
            <div>님의</div>
          </div>
          <div className="flex items-center justify-start text-20 gap-x-3">
            <div className="font-bold">{userInfo.islandName}</div>
            <div className="font-normal">섬</div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-y-6 px-14">
        <div className="w-full flex justify-between items-center text-12 font-medium text-gray-400">
          <div>오늘의 방문자</div>
          <div>{todayVisit}명</div>
        </div>
      </div>
      <div className="w-full h-[0.5px] bg-gray-50" />
      <div className="w-full px-16 flex flex-col items-center justify-center gap-y-3">
        {item.postInfo.recentPostsResponseDtoList.map((post, idx) => (
          <div
            className="w-full flex items-center justify-between"
            key={`${userInfo.moldevId}-${idx}`}
          >
            <div className="text-14 font-semibold truncate">{post.title}</div>
            <div className="text-12 font-normal">
              {changeDateFormat(post.lastModifiedDate)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslandListItemContainer;
