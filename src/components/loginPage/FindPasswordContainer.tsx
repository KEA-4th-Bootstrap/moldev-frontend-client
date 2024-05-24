import { ReactComponent as Close } from '../../assets/icons/icon_close_gray_200.svg';
import FindPasswordAuthContainer from './FindPasswordAuthContainer';
import FindPasswordChangeContainer from './FindPasswordChangeContainer';
import FindPasswordCompleted from './FindPasswordCompleted';
import { useFindPassword } from '../../hooks/loginPage/useFindPassword';

const FindPasswordContainer = ({
  isShow,
  onClose,
}: {
  isShow: boolean;
  onClose: () => void;
}) => {
  const hookReturns = useFindPassword();
  return (
    <div
      className={`w-1/3 h-[618px] p-60 rounded-modal bg-white shadow-modal flex flex-col gap-y-40 relative ${isShow ? 'translate-y-0' : 'translate-y-[200%]'} transition-all duration-150`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="font-bold text-32">비밀번호 변경</div>
      <Close
        width={28}
        height={28}
        className="cursor-pointer absolute top-[20px] right-[20px]"
        onClick={onClose}
      />
      {hookReturns.isCompleted ? (
        <FindPasswordCompleted onClose={onClose} />
      ) : hookReturns.isChangingStep ? (
        <FindPasswordChangeContainer hookReturns={hookReturns} />
      ) : (
        <FindPasswordAuthContainer hookReturns={hookReturns} />
      )}
    </div>
  );
};

export default FindPasswordContainer;
