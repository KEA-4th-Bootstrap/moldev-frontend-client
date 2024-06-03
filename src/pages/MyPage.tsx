import React from 'react';
import useModal from '../hooks/common/useModal';
import ModalBackground from '../components/common/ModalBackground';
import MyPageContainer from '../components/myPage/MyPageContainer';

const MyPage = ({ closeHandler }: { closeHandler: () => void }) => {
  const { isShow, childIsShow, onBackgroundClick } = useModal('', closeHandler);
  return (
    <ModalBackground isShow={isShow} onClick={onBackgroundClick}>
      <MyPageContainer isShow={childIsShow} onClose={onBackgroundClick} />
    </ModalBackground>
  );
};

export default MyPage;
