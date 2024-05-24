import React from 'react';
import useJoin from '../../hooks/loginPage/useJoin';
import { ReactComponent as Edit } from '../../assets/icons/icon_edit.svg';
import RectButton from '../common/RectButton';

const JoinStep3Container = ({
  hookReturns,
}: {
  hookReturns: ReturnType<typeof useJoin>;
}) => {
  const { form, inputRef, onUpload, onUploadImageButtonClick, preview } =
    hookReturns;
  const { nickname } = form;
  return (
    <>
      <div className="w-full pt-30 flex flex-col items-center justify-start gap-y-[60px]">
        <div className="w-full flex flex-col items-start justify-center gap-y-4 text-20">
          <div>
            <span className="font-semibold">{nickname}</span> 님,
          </div>
          <div>프로필 사진을 등록해보세요.</div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-y-30">
          <div className="w-[200px] h-[200px] flex items-center justify-center relative">
            <img
              className="w-full h-full object-cover rounded-full"
              src={preview}
              alt="empty"
            />
            <Edit
              className="absolute bottom-1 right-1 cursor-pointer"
              onClick={onUploadImageButtonClick}
            />
            <input
              ref={inputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={onUpload}
            />
          </div>
          <button
            className="text-center text-14 font-medium text-gray-600 hover:underline underline-offset-4 cursor-pointer"
            type="submit"
          >
            나중에 할래요
          </button>
        </div>
      </div>
      <RectButton
        type="fill"
        text="완료"
        onClick={() => {}}
        isSubmit={true}
        isAble={true}
        w={'100%'}
        h={'53px'}
      />
    </>
  );
};

export default JoinStep3Container;
