import { useEffect, useRef } from 'react';
import { ReactComponent as Mute } from '../../assets/icons/icon_mic_mute.svg';

const VideoContainer = ({
  name,
  stream,
  isMicOn,
}: {
  name: string;
  stream: MediaStream | null;
  isMicOn: boolean;
}) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="w-[230px] h-[160px] flex items-center justify-center rounded-block overflow-hidden relative">
      <video
        className="w-full h-full object-cover bg-dark-300"
        ref={ref}
        autoPlay
      />
      <div className="absolute bottom-2 left-2 max-w-[150px] px-4 py-2 bg-black bg-opacity-50 rounded-block flex items-center justify-center text-white text-12">
        {name}
      </div>
      <div className={`absolute bottom-2 right-2 ${isMicOn ? 'hidden' : ''}`}>
        <Mute />
      </div>
    </div>
  );
};

export default VideoContainer;
