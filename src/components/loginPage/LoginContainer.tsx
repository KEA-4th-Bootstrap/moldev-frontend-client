import { ReactComponent as Logo } from '../../assets/logo/logo_text.svg';
import InputContainer from './InputContainer';
import { ReactComponent as Close } from '../../assets/icons/icon_close_gray_200.svg';
import RectButton from '../common/RectButton';
import JoinContainer from './JoinContainer';
import FindPasswordContainer from './FindPasswordContainer';
import { useLogin } from '../../hooks/loginPage/useLogin';

const LoginContainer = ({
  isShow,
  onClose,
}: {
  isShow: boolean;
  onClose: () => void;
}) => {
  const {
    isJoinOpen,
    setIsJoinOpen,
    isFindPasswordOpen,
    setIsFindPasswordOpen,
    email,
    setEmail,
    password,
    setPassword,
    isError,
  } = useLogin();
  return (
    <>
      {isJoinOpen ? (
        <JoinContainer isShow={isShow} onClose={onClose} />
      ) : isFindPasswordOpen ? (
        <FindPasswordContainer isShow={isShow} onClose={onClose} />
      ) : (
        <div
          className={`w-2/5 rounded-modal bg-white shadow-modal flex flex-col gap-y-40 px-[160px] py-[60px] relative ${isShow ? 'translate-y-0' : 'translate-y-[200%]'} transition-all duration-150`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Close
            width={28}
            height={28}
            className="cursor-pointer absolute top-[20px] right-[20px]"
            onClick={onClose}
          />
          <div className="w-full flex items-center justify-center">
            <Logo height={50} />
          </div>
          <div className="w-full flex flex-col gap-y-20 items-start justify-center">
            <InputContainer
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              isError={isError}
              errorMsg="이메일 형식이 아닙니다."
            />
            <InputContainer
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              isError={isError}
              errorMsg="비밀번호가 일치하지 않습니다."
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-y-10">
            <RectButton
              text="로그인"
              onClick={() => {}}
              w={'100%'}
              h={'56px'}
              type="fill"
            />
            <div
              className="text-14 cursor-pointer hover:underline underline-offset-4"
              onClick={() => {
                setIsFindPasswordOpen(true);
              }}
            >
              비밀번호를 잊으셨나요?
            </div>
          </div>
          <RectButton
            text="회원가입"
            onClick={() => {
              setIsJoinOpen(true);
            }}
            w={'100%'}
            h={'53px'}
            type="stroke"
          />
        </div>
      )}
    </>
  );
};

export default LoginContainer;
