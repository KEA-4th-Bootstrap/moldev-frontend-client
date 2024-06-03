import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const useModal = (
  url?: string | -1,
  onClose?: () => void,
  initial?: boolean,
) => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(initial || false);
  const [childIsShow, setChildIsShow] = useState(initial || false);

  useEffect(() => {
    setIsShow(true);
    const timer = setTimeout(() => {
      setChildIsShow(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!childIsShow) {
      const timer = setTimeout(() => {
        url === undefined
          ? onClose && onClose()
          : onClose
            ? onClose()
            : url === -1
              ? navigate(-1)
              : navigate(url);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [childIsShow, navigate, url, onClose]);

  const onBackgroundClick = () => {
    setChildIsShow(false);
  };

  return { isShow, childIsShow, setChildIsShow, onBackgroundClick };
};

export default useModal;
