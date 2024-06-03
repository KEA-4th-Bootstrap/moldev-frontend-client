import { ReactComponent as Logo } from '../../assets/logo/logo_tree.svg';

const NeedLoginContainer = () => {
  return (
    <div className="w-full h-full flex flex-col gap-y-16 items-center justify-center">
      <Logo width={48} height={48} />
      <div className="text-14 font-medium">
        로그인 후 이용할 수 있는 서비스입니다.
      </div>
    </div>
  );
};

export default NeedLoginContainer;
