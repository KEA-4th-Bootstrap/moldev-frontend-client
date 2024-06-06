import { useCallback, useEffect, useRef, useState } from 'react';
import { pc_config } from '../../api/manageMeeting';
import io from 'socket.io-client';

export const useMeeting = (moldevId: string) => {
  useEffect(() => {
    console.log('moldevId:', moldevId);
  }, [moldevId]);

  const [isOnGroup, setIsOnGroup] = useState(false);
  const [isOnVideo, setIsOnVideo] = useState(false);
  const [isOnMic, setIsOnMic] = useState(false);

  const socketRef = useRef<SocketIOClient.Socket>();
  const localStreamRef = useRef<MediaStream>();
  const sendPCRef = useRef<RTCPeerConnection>();
  const receivePCsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const [users, setUsers] = useState<Array<any>>([]);

  const closeReceivePC = useCallback((socketId: string) => {
    if (!receivePCsRef.current[socketId]) return;
    receivePCsRef.current[socketId].close();
    delete receivePCsRef.current[socketId];
  }, []);

  const createReceiverOffer = useCallback(
    async (sendereSocketId: string) => {
      try {
        const receivePC = new RTCPeerConnection(pc_config);

        await receivePC
          .createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          })
          .then(async (offer) => {
            await receivePC
              .setLocalDescription(new RTCSessionDescription(offer))
              .then(() => {
                if (!socketRef.current) return;

                socketRef.current.emit('receiverOffer', {
                  offer,
                  receiverSocketId: socketRef.current.id,
                  sendereSocketId: sendereSocketId,
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
        return;
      }

      await sendPC
        .createOffer({
          offerToReceiveAudio: false,
          offerToReceiveVideo: false,
        })
        .then(async (offer) => {
          await sendPC
            .setLocalDescription(new RTCSessionDescription(offer))
            .then(() => {
              if (!socketRef.current) return;

              socketRef.current.emit('senderOffer', {
                offer,
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
        audio: true,
      });

      localStreamRef.current = stream;

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

  useEffect(() => {
    if (!localStreamRef.current) return;

    localStreamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = isOnVideo;
    });

    localStreamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = isOnMic;
    });

    console.log(
      'isOnVideo: ',
      localStreamRef.current.getVideoTracks()[0].enabled,
    );
    console.log(
      'isOnMic: ',
      localStreamRef.current.getAudioTracks()[0].enabled,
    );
  }, [localStreamRef, isOnVideo, isOnMic, isOnGroup]);

  useEffect(() => {
    setIsOnGroup(false);
    setIsOnVideo(false);
    setIsOnMic(false);
  }, [moldevId]);

  const onClickGroup = () => {
    console.log('isOnGroup prev:', isOnGroup);
    setIsOnGroup(!isOnGroup);
  };

  const onClickVideo = () => {
    console.log('isOnVideo prev:', isOnVideo);
    setIsOnVideo(!isOnVideo);
  };

  const onClickMic = () => {
    console.log('isOnMic prev:', isOnMic);
    setIsOnMic(!isOnMic);
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
        forceNew: true,
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
      users.forEach((user) => {
        closeReceivePC(user.id);
      });
    };
  }, [
    closeReceivePC,
    createReceivePC,
    createSenderOffer,
    getLocalStream,
    moldevId,
    users,
    isOnGroup,
  ]);

  return {
    localStreamRef,
    users,
    isOnGroup,
    isOnVideo,
    isOnMic,
    onClickGroup,
    onClickVideo,
    onClickMic,
  };
};
