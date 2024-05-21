import React from 'react';
import JoinRuleItemContainer from './JoinRuleItemContainer';
import RectButton from '../common/RectButton';
import useJoin from '../../hooks/loginPage/useJoin';

const JoinRuleWrapper = ({
  hookReturns,
}: {
  hookReturns: ReturnType<typeof useJoin>;
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center px-[160px] py-[60px] gap-y-[90px]">
      <div className="w-full flex flex-col items-center justify-start gap-y-40">
        <div className="w-full flex flex-col items-center justify-center gap-y-20">
          <div className="font-bold text-32">약관동의</div>
          <div className="font-medium text-20">
            몰디브 서비스 이용을 위해 약관에 동의해주세요.
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-y-22">
          <JoinRuleItemContainer
            text="전체 동의"
            isSelected={hookReturns.isTotalSelected}
            onClick={hookReturns.onClickTotal}
            isBold={true}
          />
          <JoinRuleItemContainer
            text="(필수) 서비스 이용약관 동의"
            isSelected={hookReturns.isServiceSelected}
            onClick={() => {
              hookReturns.setIsServiceSelected(!hookReturns.isServiceSelected);
            }}
            isBold={false}
          />
          <JoinRuleItemContainer
            text="(필수) 개인정보 수집 및 이용 동의"
            isSelected={hookReturns.isPersonalSelected}
            onClick={() => {
              hookReturns.setIsPersonalSelected(
                !hookReturns.isPersonalSelected,
              );
            }}
            isBold={false}
          />
          <JoinRuleItemContainer
            text="(필수) 개인정보 제3자 제공 동의"
            isSelected={hookReturns.isThirdSelected}
            onClick={() => {
              hookReturns.setIsThirdSelected(!hookReturns.isThirdSelected);
            }}
            isBold={false}
          />
          <JoinRuleItemContainer
            text="(선택) 마케팅 정보 수신 동의"
            isSelected={hookReturns.isMarketingSelected}
            onClick={() => {
              hookReturns.setIsMarketingSelected(
                !hookReturns.isMarketingSelected,
              );
            }}
            isBold={false}
          />
        </div>
      </div>
      <RectButton
        type="fill"
        text="다음"
        onClick={() => {
          hookReturns.setIsStepType(true);
          hookReturns.onChangeMarketing(hookReturns.isMarketingSelected);
        }}
        isAble={
          hookReturns.isServiceSelected &&
          hookReturns.isPersonalSelected &&
          hookReturns.isThirdSelected
        }
        w={'100%'}
        h={'56px'}
      />
    </div>
  );
};

export default JoinRuleWrapper;
