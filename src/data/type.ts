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

// export const categoryToNum = {
//   ACTIVITY: 1,
//   PROJECT: 2,
//   AWARDS: 3,
//   TROUBLE: 4,
//   // 자기소개 넣어야됨
// };

export type postListItemType = {
  postInfo: postListItemPostType;
  userInfo: postListItemUserType;
  viewCount?: number;
};
export type postListItemPostType = {
  category?: categoryType;
  content: string;
  id: number;
  createDate?: string;
  lastModifiedDate: string;
  moldevId: string;
  thumbnail: string;
  title: string;
  viewCount: number;
  memberId?: number;
};

export type mainListPostItemType = {
  category: categoryType;
  content: string;
  id: number;
  thumbnail: string;
  title: string;
  updadtedDate: string;
  viewCount: number;
};

export type postListItemUserType = {
  islandName: string;
  moldevId: string;
  nickname: string;
  profileImgUrl: string;
  memberId?: number;
  todayViewCount?: number;
};

export type myInfoType = {
  moldevId: string;
  nickname: string;
  profileImgUrl: string;
  islandName: string;
  email: string;
};

export type trendIslandType = {
  postInfo: {
    recentPostsResponseDtoList: recentPostsResponseDtoListType[];
  };
  userInfo: {
    trendingMembersResponseDtos: trendingMembersResponseDtosType[];
  };
};

export type trendingMembersResponseDtosType = {
  memberProfileResponseDto: postListItemUserType;
  redisViewCount: number;
};

export type recentPostsResponseDtoListType = {
  title: string;
  lastModifiedDate: string;
  postId: number;
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

export type messageType = {
  messageId: number;
  isBot: boolean;
  message: string;
};

export type recentListItemType = {
  id: number;
  title: string;
  updateDate: string;
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

export type searchResultPostType = {
  postInfo: {
    pageInfo: {
      hasNextPage: boolean;
      pageNumber: number;
    };
    postList: postListItemPostType[];
  };
  userInfo: {
    userList: postListItemUserType[];
  };
};

export type embeddingType = {
  title: string;
  // content: string;
  thumbnail: string;
  category: categoryType;
  url: string;
};

export type WebRTCUser = {
  id: string;
  stream: any;
};

export type reportType = 'POST' | 'REPLY';

export type reportItemType = {
  reportRequestDto: {
    reporterId: string;
    reporteeId: string;
    reason: reportReasonType;
  };
  contentId: string | number;
};

export type reportReasonType =
  | 'PROFANITY'
  | 'HATE_SPEECH'
  | 'SEXUAL_CONTENT'
  | 'VIOLENCE'
  | 'SPAM'
  | 'HARMFUL_CONTENT';

export const reportReasonFromKorean = {
  욕설: 'PROFANITY',
  '혐오 발언': 'HATE_SPEECH',
  '성적인 내용': 'SEXUAL_CONTENT',
  폭력: 'VIOLENCE',
  스팸: 'SPAM',
  '유해한 내용': 'HARMFUL_CONTENT',
};

export const reportReasonToKorean = {
  PROFANITY: '욕설',
  HATE_SPEECH: '혐오 발언',
  SEXUAL_CONTENT: '성적인 내용',
  VIOLENCE: '폭력',
  SPAM: '스팸',
  HARMFUL_CONTENT: '유해한 내용',
};
