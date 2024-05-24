import React from 'react';
import useJoin from '../../hooks/loginPage/useJoin';
import JoinAuthInputContainer from './JoinAuthInputContainer';
import RectButton from '../common/RectButton';
import PasswordInputContainer from './PasswordInputContainer';
import JoinEmailInputContainer from './JoinEmailInputContainer';
import JoinInputContainer from './JoinInputContainer';

const JoinStep1Container = ({
  hookReturns,
}: {
  hookReturns: ReturnType<typeof useJoin>;
}) => {
  const { email, password } = hookReturns.form;

  return (
    <>
      <div className="w-full flex flex-col gap-y-16">
        <JoinEmailInputContainer
          label="이메일"
          value={email}
          name="email"
          onChange={hookReturns.onChange}
          isError={hookReturns.isEmailError}
          isSended={hookReturns.isEmailSend}
          footerMessage={hookReturns.emailFooter}
          buttonClick={hookReturns.onClickEmailSend}
          isAble={email.length > 0 && !hookReturns.isEmailSend}
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
        <PasswordInputContainer
          label="비밀번호"
          value={password}
          name="password"
          onChange={hookReturns.onChange}
          isError={hookReturns.isPasswordError}
          errorMessage={'비밀번호 조건을 확인해주세요.'}
          options={[
            { isComplete: password.length >= 8, text: '8자 이상' },
            {
              isComplete:
                /[a-z]/.test(password) &&
                /[A-Z]/.test(password) &&
                /[0-9]/.test(password),
              text: '대소문자 및 숫자',
            },
            {
              isComplete: /[!@#$%^&*()\-_=+{};:,<.>]/.test(password),
              text: '특수문자 포함',
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
            password !== hookReturns.passwordCheck
          }
          errorMessage={'비밀번호가 일치하지 않습니다.'}
        />
      </div>
      <RectButton
        type="fill"
        text="다음"
        onClick={() => {
          hookReturns.next();
        }}
        isAble={hookReturns.isAbleToStep2()}
        w={'100%'}
        h={'53px'}
      />
    </>
  );
};

export default JoinStep1Container;
