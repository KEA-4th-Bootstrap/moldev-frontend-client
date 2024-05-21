import { ReactComponent as Logo } from '../../assets/logo/logo_text.svg';
import JoinStepSidebarItem from './JoinStepSidebarItem';
const JoinStepSidebar = ({ step }: { step: number }) => {
  return (
    <div className="h-full flex flex-col items-start justify-start gap-y-30 pl-30 pr-50 py-40 border-r border-gray-50">
      <Logo height={30} />
      <div className="w-[150px] flex flex-col items-start justify-start gap-y-6">
        <JoinStepSidebarItem
          step={1}
          title="기본 정보 입력"
          isActive={step === 1}
        />
        <div className="w-[28px] h-[42px] flex items-center justify-center">
          <div className="w-[3px] h-full bg-main rounded-md" />
        </div>
        <JoinStepSidebarItem step={2} title="섬 설정" isActive={step === 2} />
        <div className="w-[28px] h-[42px] flex items-center justify-center">
          <div className="w-[3px] h-full bg-main rounded-md" />
        </div>
        <JoinStepSidebarItem
          step={3}
          title="프로필사진 등록"
          isActive={step === 3}
        />
      </div>
    </div>
  );
};

export default JoinStepSidebar;
