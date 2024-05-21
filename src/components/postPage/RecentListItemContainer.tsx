import React from 'react';
import { recentListItemType } from '../../data/type';

const RecentListItemContainer = ({
  item,
  // isActive,
}: {
  item: recentListItemType;
  // isActive: boolean;
}) => {
  return (
    <div
      className={`w-full flex items-center justify-between text-18 ${item.isActive ? 'text-black' : 'text-gray-200'}`}
    >
      <div className={`${item.isActive ? 'font-semibold' : 'font-medium'}`}>
        {item.title}
      </div>
      <div>{item.createdAt}</div>
    </div>
  );
};

export default RecentListItemContainer;
