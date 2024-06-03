import { useMutation, useQuery } from 'react-query';
import {
  getMyInfo,
  patchProfile,
  patchProfileImage,
} from '../../api/memberApi';
import { myInfoType } from '../../data/type';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useMyPage = (onClose: () => void) => {
  const [nickname, setNickname] = useState('');
  const [islandName, setIslandName] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const [imageChanged, setImageChanged] = useState(false);
  const [profileChanged, setProfileChanged] = useState(false);

  const {
    isLoading: isMyInfoLoading,
    data: myInfoData,
    error: myInfoError,
  } = useQuery<myInfoType>(
    'getMyInfo',
    () => getMyInfo().then((res) => res.data.data),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      onSuccess: (data) => {
        console.log('data : ', data);
        setNickname(data.nickname);
        setIslandName(data.islandName);
        setPreview(data.profileImgUrl);
      },
      onError: (error) => {
        console.log('error : ', error);
      },
    },
  );

  const { mutate: tryPatchProfileImage } = useMutation(
    () => patchProfileImage(profileImage as File),
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        setImageChanged(true);
      },
      onError: (error) => {
        console.log('error : ', error);
        setImageChanged(false);
      },
    },
  );

  const { mutate: tryPatchProfile } = useMutation(
    () => patchProfile(nickname, islandName),
    {
      onSuccess: (data) => {
        console.log('data : ', data);
        setProfileChanged(true);
      },
      onError: (error) => {
        console.log('error : ', error);
        setProfileChanged(false);
      },
    },
  );

  useEffect(() => {
    if (imageChanged && profileChanged) {
      console.log('변경 완료');
      onClose();
    }
  }, [imageChanged, profileChanged, onClose]);

  const onUpload = (e: any) => {
    const file = e.target.files[0];

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const onClickSubmit = () => {
    if (profileImage) {
      console.log('profileImage 변경 시도');
      tryPatchProfileImage();
    } else {
      console.log('profileImage 변경 없음');
      setImageChanged(true);
    }
    if (
      nickname !== myInfoData?.nickname ||
      islandName !== myInfoData?.islandName
    ) {
      console.log('nickname 및 islandName 변경 시도');
      tryPatchProfile();
    } else {
      console.log('nickname 및 islandName 변경 없음');
      setProfileChanged(true);
    }
  };

  return {
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
  };
};
