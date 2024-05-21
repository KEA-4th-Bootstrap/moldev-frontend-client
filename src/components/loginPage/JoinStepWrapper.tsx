import React from 'react';
import JoinStepSidebar from './JoinStepSidebar';
import useJoin from '../../hooks/loginPage/useJoin';
import JoinStep1Container from './JoinStep1Container';
import JoinStep2Container from './JoinStep2Container';
import JoinStep3Container from './JoinStep3Container';
import JoinCompleteContainer from './JoinCompleteContainer';

const JoinStepWrapper = ({
  hookReturns,
  onClose,
}: {
  hookReturns: ReturnType<typeof useJoin>;
  onClose: () => void;
}) => {
  const { step, isComplete } = hookReturns;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <JoinStepSidebar step={step} />
      <div className="grow h-full px-60 pt-70 pb-50 flex flex-col items-center justify-between">
        {isComplete ? (
          <JoinCompleteContainer hookReturns={hookReturns} onClick={onClose} />
        ) : step === 1 ? (
          <JoinStep1Container hookReturns={hookReturns} />
        ) : step === 2 ? (
          <JoinStep2Container hookReturns={hookReturns} />
        ) : (
          <JoinStep3Container hookReturns={hookReturns} />
        )}
      </div>
    </div>
  );
};

export default JoinStepWrapper;
