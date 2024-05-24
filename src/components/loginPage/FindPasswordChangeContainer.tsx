import PasswordInputContainer from './PasswordInputContainer';
import RectButton from '../common/RectButton';
import { useFindPassword } from '../../hooks/loginPage/useFindPassword';
import JoinInputContainer from './JoinInputContainer';

const FindPasswordChangeContainer = ({
  hookReturns,
}: {
  hookReturns: ReturnType<typeof useFindPassword>;
}) => {
  return (
    <div className="w-full grow flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center justify-start gap-y-16">
        <PasswordInputContainer
          label="비밀번호"
          name="password"
          value={hookReturns.password}
          onChange={hookReturns.onPasswordChange}
          isError={hookReturns.isPasswordError}
          errorMessage="비밀번호 조건을 확인해주세요"
          options={[
            { text: '8자 이상', isComplete: hookReturns.password.length >= 8 },
            {
              isComplete:
                /[a-z]/.test(hookReturns.password) &&
                /[A-Z]/.test(hookReturns.password) &&
                /[0-9]/.test(hookReturns.password),
              text: '대소문자 및 숫자',
            },
            {
              text: '특수문자',
              isComplete:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(
                  hookReturns.password,
                ),
            },
          ]}
        />
        <JoinInputContainer
          label="비밀번호 확인"
          value={hookReturns.passwordCheck}
          name="passwordCheck"
          onChange={(e) => hookReturns.setPasswordCheck(e.target.value)}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          isError={
            hookReturns.passwordCheck !== '' &&
            hookReturns.password !== hookReturns.passwordCheck
          }
          errorMessage="비밀번호가 일치하지 않습니다."
        />
      </div>
      <RectButton
        type="fill"
        text="비밀번호 변경"
        onClick={hookReturns.onClickPasswordChange}
        isAble={
          hookReturns.password !== '' &&
          hookReturns.passwordCheck !== '' &&
          hookReturns.password === hookReturns.passwordCheck
        }
        w={'100%'}
        h={'56px'}
      />
    </div>
  );
};

export default FindPasswordChangeContainer;
