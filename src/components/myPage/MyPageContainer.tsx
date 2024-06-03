import { ReactComponent as Close } from '../../assets/icons/icon_close_gray_200.svg';
import { ReactComponent as Edit } from '../../assets/icons/icon_edit.svg';
import MoldevIdContainer from './MoldevIdContainer';
import JoinInputContainer from '../loginPage/JoinInputContainer';
import RectButton from '../common/RectButton';
import { useMyPage } from '../../hooks/myPage/useMyPage';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorContainer from '../common/ErrorContainer';

const MyPageContainer = ({
  isShow,
  onClose,
}: {
  isShow: boolean;
  onClose: () => void;
}) => {
  const {
    isMyInfoLoading,
    myInfoData,
    myInfoError,
    nickname,
    setNickname,
    islandName,
    setIslandName,
    preview,
    inputRef,
    onUpload,
    onUploadImageButtonClick,
    onClickSubmit,
  } = useMyPage(onClose);
  return (
    <div
      className={`min-w-[550px] w-1/3 rounded-modal bg-white shadow-modal flex flex-col gap-y-40 p-60 relative ${isShow ? 'translate-y-0' : 'translate-y-[200%]'} transition-all duration-150`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Close
        width={28}
        height={28}
        className="cursor-pointer absolute top-[20px] right-[20px]"
        onClick={onClose}
      />
      <div className="font-bold text-32">계정 설정</div>
      {!myInfoData ? (
        isMyInfoLoading ? (
          <LoadingSpinner />
        ) : myInfoError ? (
          <ErrorContainer />
        ) : (
          <div>알 수 없는 에러가 발생하였습니다.</div>
        )
      ) : (
        <>
          <div className="w-full flex flex-col gap-y-[60px] items-center justify-center">
            <div className="w-[150px] h-[150px] flex items-center justify-center relative">
              <img
                className="w-full h-full object-cover rounded-full"
                src={preview}
                alt="empty"
              />
              <Edit
                className="absolute bottom-1 right-1 cursor-pointer"
                onClick={onUploadImageButtonClick}
              />
              <input
                ref={inputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={onUpload}
              />
            </div>
            <div className="w-full flex flex-col gap-y-16">
              <MoldevIdContainer
                value={`@${myInfoData.moldevId}`}
                onChange={() => {}}
                isError={false}
                errorMessage=""
                isReadOnly={true}
              />
              <JoinInputContainer
                label="유저명"
                value={nickname}
                name="nickname"
                onChange={(e) => setNickname(e.target.value)}
                type="text"
                placeholder="유저명을 입력해주세요"
                isError={false}
                errorMessage=""
              />
              <JoinInputContainer
                label="섬 이름"
                value={islandName}
                name="islandName"
                onChange={(e) => setIslandName(e.target.value)}
                type="text"
                placeholder="섬 이름을 입력해주세요"
                isError={false}
                errorMessage=""
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-x-15">
            <RectButton
              text="취소"
              onClick={onClose}
              w={'50%'}
              h={'53px'}
              type="stroke"
            />
            <RectButton
              text="저장"
              onClick={onClickSubmit}
              w={'50%'}
              h={'53px'}
              type="fill"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyPageContainer;
