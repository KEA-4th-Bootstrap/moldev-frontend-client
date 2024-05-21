import ModalBackground from '../components/common/ModalBackground';
import LoginContainer from '../components/loginPage/LoginContainer';
import useModal from '../hooks/common/useModal';

const LoginPage = ({ closeHandler }: { closeHandler: () => void }) => {
  const { isShow, childIsShow, onBackgroundClick } = useModal('', closeHandler);
  return (
    <ModalBackground isShow={isShow} onClick={onBackgroundClick}>
      <LoginContainer isShow={childIsShow} onClose={onBackgroundClick} />
    </ModalBackground>
  );
};

export default LoginPage;
