import React from 'react';
import useJoin from '../../hooks/loginPage/useJoin';
import RectButton from '../common/RectButton';
import RoundButton from '../common/RoundButton';
import JoinInputContainer from './JoinInputContainer';

const JoinStep2Container = ({
  hookReturns,
}: {
  hookReturns: ReturnType<typeof useJoin>;
}) => {
  const { moldevId, nickname, islandName } = hookReturns.form;
  return (
    <>
      <div className="w-full flex flex-col gap-y-16">
        <div className="w-full flex flex-col gap-y-7 items-start justify-center">
          <div className="font-semibold text-14">몰디브 아이디</div>
          <div className="w-full h-[50px] border-b border-gray-50 rounded-t-[13px] p-16 flex items-center justify-start gap-x-10">
            <input
              value={moldevId}
              name="moldevId"
              onChange={hookReturns.onChange}
              type="text"
              className="grow text-14 outline-none bg-transparent"
              placeholder="몰디브 아이디를 입력해주세요."
            />
            <div className="flex items-center justify-end gap-x-10">
              <RoundButton
                type="fill"
                text="중복확인"
                fontSize={14}
                isAble={!hookReturns.isMoldevIdVerified && moldevId.length > 0}
                onClick={hookReturns.onClickMoldevIdCheck}
                w={'112px'}
                h={'35px'}
              />
            </div>
          </div>
          <div
            className={`w-full h-[20px] font-medium text-14 ${hookReturns.isMoldevIdDuplicated ? 'text-negative' : 'text-main'}`}
          >
            {hookReturns.moldevIdFooter}
          </div>
        </div>
        <JoinInputContainer
          label="유저명"
          value={nickname}
          name="nickname"
          onChange={hookReturns.onChange}
          type="text"
          placeholder="유저명을 입력해주세요"
          isError={nickname === ''}
          errorMessage={'유저명을 입력해주세요'}
        />
        <JoinInputContainer
          label="섬 이름"
          value={islandName}
          name="islandName"
          onChange={hookReturns.onChange}
          type="text"
          placeholder="섬 이름을 입력해주세요"
          isError={islandName === ''}
          errorMessage={'섬 이름을 입력해주세요'}
        />
      </div>
      <RectButton
        type="fill"
        text="다음"
        onClick={() => {
          hookReturns.next();
        }}
        isAble={
          hookReturns.isMoldevIdVerified &&
          nickname.length > 0 &&
          islandName.length > 0
        }
        w={'100%'}
        h={'53px'}
      />
    </>
  );
};

export default JoinStep2Container;
