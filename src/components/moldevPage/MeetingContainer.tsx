import { ReactComponent as GroupOn } from '../../assets/icons/icon_group_on.svg';
import { ReactComponent as GroupOff } from '../../assets/icons/icon_group_off.svg';
import { ReactComponent as VideoOn } from '../../assets/icons/icon_video_on.svg';
import { ReactComponent as VideoOff } from '../../assets/icons/icon_video_off.svg';
import { ReactComponent as MicOn } from '../../assets/icons/icon_mic_on.svg';
import { ReactComponent as MicOff } from '../../assets/icons/icon_mic_off.svg';
import { ReactComponent as Visit } from '../../assets/icons/icon_visit.svg';
import Toggle from './Toggle';
import VideoContainer from './VideoContainer';
import { useMeeting } from '../../hooks/moldevPage/useMeeting';
import { useEffect } from 'react';

const MeetingContainer = ({ moldevId }: { moldevId: string }) => {
  const {
    myMoldevId,
    mySocketId,
    isLoggedIn,
    onClickLogin,
    localStreamRef,
    localStream,
    users,
    isOnGroup,
    isOnVideo,
    isOnMic,
    onClickGroup,
    onClickVideo,
    onClickMic,
  } = useMeeting(moldevId);

  useEffect(() => {
    console.log('MeetingContainer Rendered');
    console.log('localStremRef : ', localStreamRef.current);
  }, [localStreamRef]);

  return (
    <>
      {!isOnGroup && (
        <div className="absolute top-[30px] left-[24px]">
          <Toggle
            type="default"
            icon={<Visit />}
            text="28명 방문"
            isItemHover={true}
            onClick={() => {}}
            canClick={false}
          />
        </div>
      )}
      {!isLoggedIn && (
        <div className="absolute top-[30px] right-[24px]">
          <Toggle
            type="main"
            icon={<GroupOn />}
            text="로그인 후 구경 참여"
            isItemHover={true}
            onClick={onClickLogin}
            canClick={true}
          />
        </div>
      )}
      {isLoggedIn && (
        <div
          className={`absolute top-[30px] right-[24px] left-[24px] flex items-start justify-end gap-x-30`}
        >
          {isOnGroup && (
            <div className="grow h-[160px] flex items-center justify-between gap-x-15 overflow-hidden">
              <div className="h-full flex items-center justify-start gap-x-16 overflow-x-scroll scrollbar-hide">
                {users.map(
                  (user) =>
                    user.id !== mySocketId && (
                      <VideoContainer
                        key={user.id}
                        stream={user.stream}
                        name={user.name}
                        isMicOn={false}
                      />
                    ),
                )}
              </div>
              <div className="shrink-0 flex items-center justify-center">
                {
                  // 로컬 스트림이 있을 때만 렌더링
                  localStream && (
                    <VideoContainer
                      stream={localStream}
                      name={`${myMoldevId} (나)`}
                      isMicOn={isOnMic}
                    />
                  )
                }
              </div>
            </div>
          )}
          <div
            className={`shrink-0 flex flex-col items-end justify-start gap-y-16 ${isOnGroup ? 'max-h-[200px]' : 'max-h-[50px]'} transition-all duration-300 ease-in-out overflow-hidden`}
          >
            {isOnGroup ? (
              <>
                <Toggle
                  type="default"
                  icon={<GroupOff />}
                  text="구경 그만하기"
                  isItemHover={true}
                  onClick={onClickGroup}
                  canClick={true}
                />
                {/* <Toggle
                  type="main"
                  icon={<VideoOn />}
                  isItemHover={true}
                  onClick={() => {}}
                  canClick={true}
                />
                <Toggle
                  type="main"
                  icon={<MicOn />}
                  isItemHover={true}
                  onClick={() => {}}
                  canClick={true}
                /> */}
                {isOnVideo ? (
                  <Toggle
                    type="main"
                    icon={<VideoOn />}
                    isItemHover={true}
                    onClick={onClickVideo}
                    canClick={true}
                  />
                ) : (
                  <Toggle
                    type="default"
                    icon={<VideoOff />}
                    isItemHover={true}
                    onClick={onClickVideo}
                    canClick={true}
                  />
                )}
                {isOnMic ? (
                  <Toggle
                    type="main"
                    icon={<MicOn />}
                    isItemHover={true}
                    onClick={onClickMic}
                    canClick={true}
                  />
                ) : (
                  <Toggle
                    type="default"
                    icon={<MicOff />}
                    isItemHover={true}
                    onClick={onClickMic}
                    canClick={true}
                  />
                )}
              </>
            ) : (
              <Toggle
                type="main"
                icon={<GroupOn />}
                text="구경 참여"
                isItemHover={true}
                onClick={onClickGroup}
                canClick={true}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MeetingContainer;
