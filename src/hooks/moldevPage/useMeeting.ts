import { useCallback, useEffect, useRef, useState } from 'react';
import { pc_config } from '../../api/manageMeeting';
import io from 'socket.io-client';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { getMoldevId } from '../../api/manageLocalStorage';

export const useMeeting = (moldevId: string) => {
  useEffect(() => {
    console.log('moldevId:', moldevId);
  }, [moldevId]);

  const myMoldevId = getMoldevId();
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [isOnGroup, setIsOnGroup] = useState(false);
  // const [isOnVideo, setIsOnVideo] = useState(false);
  const [isOnVideo, setIsOnVideo] = useState(true);
  // const [isOnMic, setIsOnMic] = useState(false);
  const [isOnMic, setIsOnMic] = useState(true);

  const socketRef = useRef<SocketIOClient.Socket>();
  const localStreamRef = useRef<MediaStream>();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null); // 추가된 상태
  const sendPCRef = useRef<RTCPeerConnection>();
  const receivePCsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const [users, setUsers] = useState<Array<any>>([]);

  const onClickLogin = () => {
    navigate('/');
  };

  const closeReceivePC = useCallback((socketId: string) => {
    if (!receivePCsRef.current[socketId]) return;
    receivePCsRef.current[socketId].close();
    delete receivePCsRef.current[socketId];
  }, []);

  const createReceiverOffer = useCallback(
    async (senderSocketId: string) => {
      try {
        const receivePC = new RTCPeerConnection(pc_config);

        await receivePC
          .createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          })
          .then(async (sdp) => {
            receivePC
              .setLocalDescription(new RTCSessionDescription(sdp))
              .then(() => {
                if (!socketRef.current) return;

                socketRef.current.emit('receiverOffer', {
                  sdp,
                  receiverSocketId: socketRef.current.id,
                  senderSocketId,
                  roomId: moldevId,
                });
              });
          });

        return receivePC;
      } catch (error) {
        console.error('createReceiverOffer error:', error);
        return undefined;
      }
    },
    [moldevId],
  );

  const createReceiverPeerConnection = useCallback(
    (pc: RTCPeerConnection, socketId: string) => {
      try {
        receivePCsRef.current = {
          ...receivePCsRef.current,
          [socketId]: pc,
        };

        pc.onicecandidate = (e) => {
          if (!(e.candidate && socketRef.current)) return;
          socketRef.current.emit('receiverCandidate', {
            candidate: e.candidate,
            receiverSocketId: socketRef.current.id,
            senderSocketId: socketId,
            roomId: moldevId,
          });
        };

        pc.oniceconnectionstatechange = (e) => {
          console.log('oniceconnectionstatechange:', e);
        };

        pc.ontrack = (e) => {
          console.log('ontrack:', e);
          setUsers((prev) =>
            prev
              .filter((user) => user.id !== socketId)
              .concat({
                id: socketId,
                stream: e.streams[0],
              }),
          );
        };
      } catch (error) {
        console.error('createReceiverPeerConnection error:', error);
      }
    },
    [moldevId],
  );

  const createReceivePC = useCallback(
    async (sockedId: string) => {
      try {
        console.log('createReceivePC:', sockedId);
        const receivePC = await createReceiverOffer(sockedId);
        if (!(socketRef.current && receivePC)) return;
        createReceiverPeerConnection(receivePC, sockedId);
      } catch (error) {
        console.error('createReceivePC error:', error);
      }
    },
    [createReceiverOffer, createReceiverPeerConnection],
  );

  const createSenderOffer = useCallback(async () => {
    try {
      const sendPC = new RTCPeerConnection(pc_config);
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          if (!localStreamRef.current) return;
          sendPC.addTrack(track, localStreamRef.current);
        });
      } else {
        console.error('localStreamRef.current is null');
      }

      await sendPC
        .createOffer({
          offerToReceiveAudio: false,
          offerToReceiveVideo: false,
        })
        .then(async (sdp) => {
          sendPC
            .setLocalDescription(new RTCSessionDescription(sdp))
            .then(async () => {
              if (!socketRef.current) return;

              await socketRef.current.emit('senderOffer', {
                sdp,
                senderSocketId: socketRef.current.id,
                roomId: moldevId,
              });
            });
        });

      sendPC.onicecandidate = (e) => {
        if (!(e.candidate && socketRef.current)) return;
        socketRef.current.emit('senderCandidate', {
          candidate: e.candidate,
          senderSocketId: socketRef.current.id,
          roomId: moldevId,
        });
      };

      sendPC.oniceconnectionstatechange = (e) => {
        console.log('oniceconnectionstatechange:', e);
      };
      sendPCRef.current = sendPC;
    } catch (error) {
      console.error('createSenderOffer error:', error);
    }
  }, [moldevId]);

  const getLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 230,
          height: 160,
        },
        // video: true,
        audio: true,
      });

      console.log('Stream:', stream); // 스트림이 제대로 할당되었는지 확인
      localStreamRef.current = stream;
      setLocalStream(stream); // 상태로 설정
      console.log('Local Stream:', localStreamRef.current); // 스트림이 제대로 할당되었는지 확인

      if (!socketRef.current) return;

      if (isOnGroup) {
        await createSenderOffer();

        socketRef.current.emit('joinRoom', {
          id: socketRef.current.id,
          roomId: moldevId,
        });
      }
    } catch (error) {
      console.error('getLocalStream error:', error);
    }
  }, [createSenderOffer, moldevId, isOnGroup]);

  // useEffect(() => {
  //   if (!localStreamRef.current) return;
  //   if (!isLoggedIn) return;

  //   localStreamRef.current.getVideoTracks().forEach((track) => {
  //     track.enabled = isOnVideo;
  //   });

  //   localStreamRef.current.getAudioTracks().forEach((track) => {
  //     track.enabled = isOnMic;
  //   });

  //   console.log(
  //     'isOnVideo: ',
  //     localStreamRef.current.getVideoTracks()[0].enabled,
  //   );
  //   console.log(
  //     'isOnMic: ',
  //     localStreamRef.current.getAudioTracks()[0].enabled,
  //   );
  // }, [localStreamRef, isOnVideo, isOnMic, isOnGroup, isLoggedIn]);

  useEffect(() => {
    setIsOnGroup(false);
    // setIsOnVideo(false);
    // setIsOnVideo(true);
    // setIsOnMic(false);
    // setIsOnMic(true);
  }, [moldevId]);

  const onClickGroup = () => {
    console.log('isOnGroup prev:', isOnGroup);
    setIsOnGroup(!isOnGroup);
  };

  const onClickVideo = () => {
    console.log('isOnVideo prev:', isOnVideo);
    // setIsOnVideo(!isOnVideo);
    // setIsOnVideo(true);
  };

  const onClickMic = () => {
    console.log('isOnMic prev:', isOnMic);
    // setIsOnMic(!isOnMic);
    // setIsOnMic(true);
  };

  useEffect(() => {
    if (!isOnGroup) return;

    socketRef.current = io.connect(
      process.env.REACT_APP_SOCKET_SERVER_URL || '',
      {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        forceNew: false,
      },
    );

    getLocalStream();

    socketRef.current.on('userEnter', (data: { id: string }) => {
      console.log('userEnter:', data);
      createReceivePC(data.id);
    });

    socketRef.current.on(
      'allUsers',
      (data: { users: Array<{ id: string }> }) => {
        console.log('allUsers:', data);
        data.users.forEach((user) => {
          createReceivePC(user.id);
        });
      },
    );

    socketRef.current.on('userExit', (data: { id: string }) => {
      console.log('userExit:', data);
      closeReceivePC(data.id);
      setUsers((prev) => prev.filter((user) => user.id !== data.id));
    });

    socketRef.current.on(
      'getSenderAnswer',
      async (data: { sdp: RTCSessionDescription }) => {
        try {
          if (!sendPCRef.current) return;
          await sendPCRef.current.setRemoteDescription(
            new RTCSessionDescription(data.sdp),
          );
        } catch (error) {
          console.error('getSenderAnswer error:', error);
        }
      },
    );

    socketRef.current.on(
      'getSenderCandidate',
      async (data: { candidate: RTCIceCandidateInit }) => {
        try {
          if (!(data.candidate && sendPCRef.current)) return;
          await sendPCRef.current.addIceCandidate(
            new RTCIceCandidate(data.candidate),
          );
        } catch (error) {
          console.error('getSenderCandidate error:', error);
        }
      },
    );

    socketRef.current.on(
      'getReceiverAnswer',
      async (data: { id: string; sdp: RTCSessionDescription }) => {
        try {
          console.log('getReceiverAnswer:', data);
          const pc: RTCPeerConnection = receivePCsRef.current[data.id];
          if (!pc) return;
          pc.setRemoteDescription(data.sdp);
          console.log(`socketID(${data.id}) setRemoteDescription SUCCESS`);
        } catch (error) {
          console.error('getReceiverAnswer error:', error);
        }
      },
    );

    socketRef.current.on(
      'getReceiverCandidate',
      async (data: { id: string; candidate: RTCIceCandidateInit }) => {
        try {
          const pc: RTCPeerConnection = receivePCsRef.current[data.id];
          if (!(data.candidate && pc)) return;
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (error) {
          console.error('getReceiverCandidate error:', error);
        }
      },
    );

    return () => {
      console.log('RETURN ALL CLEANUP');
      if (socketRef.current) {
        socketRef.current.emit('quitRoom', {
          roomId: moldevId,
        });
        socketRef.current.disconnect();
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
      if (sendPCRef.current) {
        sendPCRef.current.close();
      }
      Object.keys(receivePCsRef.current).forEach((socketId) => {
        receivePCsRef.current[socketId].close();
        delete receivePCsRef.current[socketId];
      });
    };
  }, [
    closeReceivePC,
    createReceivePC,
    createSenderOffer,
    getLocalStream,
    moldevId,
    isOnGroup, // users를 제거
  ]);

  // users 상태 업데이트를 별도의 useEffect 훅으로 분리
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on('userExit', (data: { id: string }) => {
        console.log('userExit:', data);
        closeReceivePC(data.id);
        setUsers((prev) => prev.filter((user) => user.id !== data.id));
      });
    }
  }, [closeReceivePC]);

  return {
    myMoldevId,
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
    setIsOnVideo,
    setIsOnMic,
  };
};
