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

export type categoryType = 'activity' | 'project' | 'awards' | 'trouble';
export const categoryToKorean = {
  activity: '대외활동',
  project: '프로젝트',
  awards: '수상이력',
  trouble: '트러블슈팅',
};

export type postListItemType = {
  moldevId: string;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  visit: number;
  category: categoryType;
  img: string;
  userName: string;
  userImg: string;
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
  commentId: number;
  content: string;
  createdAt: string;
  userImg: string;
  userName: string;
  islandName: string;
  reply: commentType[];
};

export type joinType = {
  isMarketing: boolean;
  email: string;
  password: string;
  moldevId: string;
  userName: string;
  islandName: string;
  profileImage: string | ArrayBuffer;
};
