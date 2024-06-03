import { ReactComponent as Logo } from '../../assets/logo/logo_tree.svg';

const EmptyContainer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[200px] gap-y-20">
      <Logo width={100} />
      <div className="text-center text-gray-400">일치하는 내용이 없습니다.</div>
    </div>
  );
};

export default EmptyContainer;
