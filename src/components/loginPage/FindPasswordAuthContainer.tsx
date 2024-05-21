import JoinInputContainer from './JoinInputContainer';
import RectButton from '../common/RectButton';
import { useFindPassword } from '../../hooks/loginPage/useFindPassword';

const FindPasswordAuthContainer = ({
  handleNext,
  hookReturns,
}: {
  handleNext: () => void;
  hookReturns: ReturnType<typeof useFindPassword>;
}) => {
  return (
    <div className="w-full grow flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center justify-start gap-y-16">
        <JoinInputContainer
          name="email"
          label="이메일"
          type="email"
          placeholder="가입한이메일을 입력해주세요"
          value={hookReturns.email}
          onChange={(e) => hookReturns.setEmail(e.target.value)}
          isError={false}
          errorMessage=""
          buttonText="인증번호 전송"
          isAble={hookReturns.email.length > 0}
          buttonClick={() => hookReturns.setIsEmailSended(true)}
        />
        {hookReturns.isEmailSended && (
          <JoinInputContainer
            name="auth"
            label="인증번호"
            type="text"
            placeholder="인증번호를 입력해주세요"
            value={hookReturns.auth}
            onChange={(e) => hookReturns.setAuth(e.target.value)}
            isError={false}
            errorMessage=""
            isAble={hookReturns.auth.length > 0}
            buttonText="인증번호 확인"
            buttonClick={() => {
              hookReturns.setIsAuthChecked(true);
            }}
          />
        )}
      </div>
      <RectButton
        type="fill"
        text="다음"
        onClick={handleNext}
        w={'100%'}
        h={'56px'}
        isAble={hookReturns.isAuthChecked}
      />
    </div>
  );
};

export default FindPasswordAuthContainer;
