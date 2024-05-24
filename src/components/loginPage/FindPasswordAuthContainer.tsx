import RectButton from '../common/RectButton';
import { useFindPassword } from '../../hooks/loginPage/useFindPassword';
import JoinEmailInputContainer from './JoinEmailInputContainer';
import JoinAuthInputContainer from './JoinAuthInputContainer';

const FindPasswordAuthContainer = ({
  hookReturns,
}: {
  hookReturns: ReturnType<typeof useFindPassword>;
}) => {
  return (
    <div className="w-full grow flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center justify-start gap-y-16">
        <JoinEmailInputContainer
          label="이메일"
          value={hookReturns.email}
          name="email"
          onChange={hookReturns.onEmailChange}
          isError={hookReturns.isEmailError}
          isSended={hookReturns.isEmailSend}
          footerMessage={hookReturns.emailFooter}
          buttonClick={hookReturns.onClickEmailSend}
          isAble={hookReturns.email.length > 0 && !hookReturns.isEmailSend}
        />
        {hookReturns.isEmailSend && (
          <JoinAuthInputContainer
            label="인증번호"
            value={hookReturns.auth}
            name="authNumber"
            onChange={(e) => hookReturns.setAuth(e.target.value)}
            isError={hookReturns.isAuthError}
            isVerified={hookReturns.isAuthVerified}
            errorMessage={hookReturns.authError}
            buttonClick={hookReturns.onClickAuthSubmit}
            isAble={hookReturns.auth.length > 0}
            remainTime={hookReturns.remainTime}
          />
        )}
      </div>
      <RectButton
        type="fill"
        text="다음"
        onClick={hookReturns.onClickHandleNext}
        w={'100%'}
        h={'56px'}
        isAble={hookReturns.isAuthVerified && hookReturns.isEmailSend}
      />
    </div>
  );
};

export default FindPasswordAuthContainer;
