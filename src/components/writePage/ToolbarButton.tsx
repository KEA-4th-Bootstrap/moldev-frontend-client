import React from 'react';
import { toolbarButtonProps } from '../../data/type';

const ToolbarButton = (props: toolbarButtonProps) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (props.onToggle) {
      props.onToggle(props.style || '');
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick();
    }
  };

  const className = `rounded-block cursor-pointer flex items-center justify-center p-4 toolbar_button ${props.className} ${props.active && 'bg-gray-50'}`;

  return (
    <div
      className={className}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <img
        width={24}
        src={`/assets/icons/${props.img}`}
        alt={props.className}
      />
    </div>
  );
};

export default ToolbarButton;
