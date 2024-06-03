import { ReactComponent as Logo } from '../../assets/logo/logo_tree.svg';

const NeedMoldevPage = () => {
  return (
    <div className="grow h-full flex flex-col gap-y-16 items-center justify-center">
      <Logo width={48} height={48} />
      <div className="w-full flex flex-col gap-y-8 items-center justify-center text-14 font-medium">
        <div>누군가의 섬으로 이동해주세요.</div>
        <div>나와 어울리는 섬을 추천받으실 수도 있습니다.</div>
      </div>
    </div>
  );
};

export default NeedMoldevPage;
