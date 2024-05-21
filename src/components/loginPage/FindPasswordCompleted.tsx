import React from 'react';
import RectButton from '../common/RectButton';
import { ReactComponent as Logo } from '../../assets/logo/logo_tree.svg';

const FindPasswordCompleted = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-full grow flex flex-col items-center justify-between pt-60">
      <div className="w-full flex flex-col items-center justify-start gap-y-16">
        <Logo className="w-[64px] h-[64px]" />
        <div className="flex flex-col gap-y-8 text-16 items-center ">
          <div>비밀번호가 성공적으로 변경되었습니다.</div>
          <div>다시 로그인을 시도해주세요.</div>
        </div>
      </div>
      <RectButton
        type="fill"
        text="확인"
        onClick={onClose}
        w={'100%'}
        h={'56px'}
      />
    </div>
  );
};

export default FindPasswordCompleted;
