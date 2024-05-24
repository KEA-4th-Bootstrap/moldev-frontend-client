export interface ItemDimensions {
  width: number;
  height: number;
}

export type lineHeaderType = 'post' | 'island';

export type buttonType = 'fill' | 'stroke' | 'disable' | 'incomplete';

export type searchOptionType = 'post' | 'island';

export type Toggles = {
  [BOLD: string]: boolean;
  ITALIC: boolean;
  UNDERLINE: boolean;
  STRIKETHROUGH: boolean;
};

export type toolbarButtonProps = {
  onClick?: () => void;
  onToggle?: (toggle: string) => void;
  active?: boolean;
  className: string;
  style?: string;
  img: string;
};

export type sideType =
  | 'list'
  | 'search'
  | 'chatbot'
  | 'recommend'
  | 'onboarding';

export type categoryType = 'ACTIVITY' | 'PROJECT' | 'AWARDS' | 'TROUBLE';
export const categoryToKorean = {
  ACTIVITY: '대외활동',
  PROJECT: '프로젝트',
  AWARDS: '수상이력',
  TROUBLE: '트러블슈팅',
};

export type postListItemType = {
  postInfo: postListItemPostType;
  userInfo: postListItemUserType;
};
export type postListItemPostType = {
  category: categoryType;
  content: string;
  id: number;
  lastModifiedDate: string;
  moldevId: string;
  thumbnail: string;
  title: string;
  viewCount: number;
};

export type postListItemUserType = {
  islandName: string;
  moldevId: string;
  nickname: string;
  profileImgUrl: string;
};

export type islandListItemType = {
  moldevId: string;
  userName: string;
  userImg: string;
  islandName: string;
  visit: number;
  updated: string;
  articles: {
    id: number;
    title: string;
    createdAt: string;
  }[];
};

export type recommendIslandType = {
  percentage: number;
  island: islandListItemType;
};

export type messageType = {
  messageId: number;
  isBot: boolean;
  message: string;
};

export type recentListItemType = {
  postId: number;
  title: string;
  createdAt: string;
  isActive: boolean;
};

export type commentType = {
  commentInfo: commentItemType;
  userInfo: postListItemUserType;
};

export type commentItemType = {
  id: string;
  memberId: number;
  postId: number;
  content: string;
  replyCount: number;
  createdAt: string;
};

export type replyType = {
  replyInfo: replyItemType;
  userInfo: postListItemUserType;
};

export type replyItemType = {
  id: string;
  memberId: number;
  content: string;
  parentsId: string;
  createdAt: string;
};

export type joinType = {
  isMarketingAgree: boolean;
  email: string;
  password: string;
  moldevId: string;
  nickname: string;
  islandName: string;
};
