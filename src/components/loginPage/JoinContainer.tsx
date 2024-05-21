import { ReactComponent as Close } from '../../assets/icons/icon_close_gray_200.svg';
import useJoin from '../../hooks/loginPage/useJoin';
import JoinRuleWrapper from './JoinRuleWrapper';
import JoinStepWrapper from './JoinStepWrapper';

const JoinContainer = ({
  isShow,
  onClose,
}: {
  isShow: boolean;
  onClose: () => void;
}) => {
  const hookReturns = useJoin();

  return (
    <div
      className={`w-1/2 h-[670px] rounded-modal bg-white shadow-modal flex flex-col gap-y-40 relative ${isShow ? 'translate-y-0' : 'translate-y-[200%]'} transition-all duration-150`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <form
        className="w-full h-full flex flex-col items-center justify-center gap-y-40"
        onSubmit={hookReturns.onSubmit}
      >
        {hookReturns.isStepType ? (
          <JoinStepWrapper hookReturns={hookReturns} onClose={onClose} />
        ) : (
          <JoinRuleWrapper hookReturns={hookReturns} />
        )}
      </form>
      <Close
        width={28}
        height={28}
        className="cursor-pointer absolute top-[20px] right-[20px]"
        onClick={onClose}
      />
    </div>
  );
};

export default JoinContainer;
