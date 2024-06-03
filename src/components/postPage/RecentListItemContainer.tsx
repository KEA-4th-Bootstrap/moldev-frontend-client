import React from 'react';
import { recentListItemType } from '../../data/type';
import { useDateFormat } from '../../hooks/common/useDateFormat';
import { useNavigate } from 'react-router-dom';

const RecentListItemContainer = ({
  moldevId,
  item,
  isActive,
}: {
  moldevId: string;
  item: recentListItemType;
  isActive: boolean;
}) => {
  const date = useDateFormat(item.updateDate);
  const navigate = useNavigate();
  return (
    <div
      className={`w-full flex items-center justify-between text-18 ${isActive ? 'text-black' : 'text-gray-200'} hover:underline underline-offset-4 cursor-pointer`}
      onClick={() => navigate(`/${moldevId}/${item.id}`, { replace: true })}
    >
      <div className={`${isActive ? 'font-semibold' : 'font-medium'}`}>
        {item.title}
      </div>
      <div>{date}</div>
    </div>
  );
};

export default RecentListItemContainer;
