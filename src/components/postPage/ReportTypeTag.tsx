import React from 'react';
import { reportType } from '../../data/type';

const ReportTypeTag = ({ type }: { type: reportType }) => {
  return (
    <div
      className={`flex text-14 items-center justify-center rounded-lg px-8 py-4 ${type === 'POST' ? 'bg-admin-tag-blue/15 text-admin-tag-blue' : 'bg-admin-tag-green/15 text-admin-tag-green'}`}
    >
      {type === 'POST' ? '게시글' : '댓글'}
    </div>
  );
};

export default ReportTypeTag;
