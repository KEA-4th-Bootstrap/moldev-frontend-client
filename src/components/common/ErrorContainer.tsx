import { ReactComponent as Logo } from '../../assets/logo/logo_tree.svg';
const ErrorContainer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[300px] gap-y-20">
      <Logo width={100} />
      <div className="text-center text-gray-400">
        에러가 발생했습니다.
        <br />
        잠시 후 다시 시도해주세요.
      </div>
    </div>
  );
};

export default ErrorContainer;
