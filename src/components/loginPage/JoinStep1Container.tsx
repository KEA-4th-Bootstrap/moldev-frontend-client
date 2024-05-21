import React from 'react';
import useJoin from '../../hooks/loginPage/useJoin';
import JoinInputContainer from './JoinInputContainer';
import RectButton from '../common/RectButton';
import PasswordInputContainer from './PasswordInputContainer';

const JoinStep1Container = ({
  hookReturns,
}: {
  hookReturns: ReturnType<typeof useJoin>;
}) => {
  const { email, password } = hookReturns.form;

  return (
    <>
      <div className="w-full flex flex-col gap-y-16">
        <JoinInputContainer
          label="이메일"
          value={email}
          name="email"
          onChange={hookReturns.onChange}
          type="email"
          placeholder="이메일을 입력해주세요"
          errorMessage={hookReturns.error}
          isError={hookReturns.isError}
          buttonText="인증번호 전송"
          buttonClick={() => {
            hookReturns.setIsEmailSend(true);
            console.log('인증번호 전송');
          }}
          isAble={email.length > 0}
        />
        {hookReturns.isEmailSend && (
          <JoinInputContainer
            label="인증번호"
            value={hookReturns.authNumber}
            name="authNumber"
            onChange={(e) => hookReturns.setAuthNumber(e.target.value)}
            type="text"
            placeholder="인증번호를 입력해주세요"
            errorMessage={hookReturns.error}
            isError={hookReturns.isError}
            remainTime={hookReturns.remainTime}
          />
        )}
        <PasswordInputContainer
          label="비밀번호"
          value={password}
          name="password"
          onChange={hookReturns.onChange}
          isError={hookReturns.isError}
          errorMessage={hookReturns.error}
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
          isError={hookReturns.isError}
          errorMessage={hookReturns.error}
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
