import PasswordInputContainer from './PasswordInputContainer';
import JoinInputContainer from './JoinInputContainer';
import RectButton from '../common/RectButton';
import { useFindPassword } from '../../hooks/loginPage/useFindPassword';

const FindPasswordChangeContainer = ({
  handleNext,
  hookReturns,
}: {
  handleNext: () => void;
  hookReturns: ReturnType<typeof useFindPassword>;
}) => {
  return (
    <div className="w-full grow flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center justify-start gap-y-16">
        <PasswordInputContainer
          label="비밀번호"
          name="password"
          value={hookReturns.password}
          onChange={(e) => hookReturns.setPassword(e.target.value)}
          isError={false}
          errorMessage=""
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
          name="check-password"
          value={hookReturns.checkPassword}
          onChange={(e) => hookReturns.setCheckPassword(e.target.value)}
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          isError={false}
          errorMessage=""
        />
      </div>
      <RectButton
        type="fill"
        text="비밀번호 변경"
        onClick={handleNext}
        isAble={
          hookReturns.password !== '' &&
          hookReturns.password === hookReturns.checkPassword
        }
        w={'100%'}
        h={'56px'}
      />
    </div>
  );
};

export default FindPasswordChangeContainer;
