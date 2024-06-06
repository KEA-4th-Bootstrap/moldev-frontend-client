import { mainListPostItemType, postListItemType } from '../../../data/type';
import { useDateFormat } from '../../common/useDateFormat';
import useRouteNavigate from '../../common/useRouteNavigate';

export const useSearchResultPost = (
  item: postListItemType | mainListPostItemType,
  moldevId: string,
  userName?: string,
  profileImage?: string,
) => {
  const post = 'postInfo' in item ? item.postInfo : item;
  const date = useDateFormat(
    'postInfo' in item ? item.postInfo.createDate : item.updadtedDate,
  );
  const userInfo =
    'userInfo' in item
      ? item.userInfo
      : { nickname: userName, profileImgUrl: profileImage };

  const { onClick } = useRouteNavigate(`/${moldevId}/${post.id}`);

  return { post, userInfo, onClick, date };
};
