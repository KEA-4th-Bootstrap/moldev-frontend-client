import { ReactNode } from 'react';

const ModalBackground = ({
  isShow,
  onClick,
  children,
}: {
  isShow: boolean;
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full min-h-screen h-full bg-white/50 backdrop-blur-sm flex items-center justify-center ${isShow ? '' : 'hidden'}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ModalBackground;
