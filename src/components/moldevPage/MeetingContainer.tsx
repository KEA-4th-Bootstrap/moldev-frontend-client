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

const MeetingContainer = ({ moldevId }: { moldevId: string }) => {
  const {
    localStreamRef,
    users,
    isOnGroup,
    isOnVideo,
    isOnMic,
    onClickGroup,
    onClickVideo,
    onClickMic,
  } = useMeeting(moldevId);

  return (
    <>
      {!isOnGroup && (
        <div className="absolute top-[30px] left-[24px]">
          <Toggle
            type="default"
            icon={<Visit />}
            text="28명 방문"
            isItemHover={false}
            onClick={() => {}}
            canClick={false}
          />
        </div>
      )}
      <div
        className={`absolute top-[30px] right-[24px] left-[24px] flex items-start justify-end gap-x-30`}
      >
        {isOnGroup && (
          <div className="grow flex items-center justify-start bg-gray-50 gap-x-15">
            <div className="grow flex items-center justify-end gap-x-16 bg-gray-600">
              {users.map((user) => (
                <VideoContainer
                  key={user.id}
                  stream={user.stream}
                  name={user.name}
                  isMicOn={false}
                />
              ))}
            </div>
            <div className="flex itemcen justify-center">
              <VideoContainer
                stream={localStreamRef.current || null}
                name={`${moldevId} (나)`}
                isMicOn={isOnMic}
              />
            </div>
          </div>
        )}
        <div
          className={`flex flex-col items-end justify-start gap-y-16 ${isOnGroup ? 'max-h-[200px]' : 'max-h-[50px]'} transition-all duration-300 ease-in-out overflow-hidden`}
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
    </>
  );
};

export default MeetingContainer;
