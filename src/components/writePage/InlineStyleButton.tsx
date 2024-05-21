import React from 'react';
import ToolbarButton from './ToolbarButton';

const toggleButtonOptions = [
  { name: 'icon_text-bold.svg', action: 'BOLD' },
  { name: 'icon_text-italic.svg', action: 'ITALIC' },
  { name: 'icon_text-underline.svg', action: 'UNDERLINE' },
  { name: 'icon_text-strikethrough.svg', action: 'STRIKETHROUGH' },
];

const InlineStyleButton = (props: any) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="toolbar__controls">
      {toggleButtonOptions.map((type, index) => (
        <ToolbarButton
          key={index}
          img={type.name}
          className={`toolbar__button--${type.action}`}
          active={currentStyle.has(type.action)}
          onToggle={props.onToggle}
          style={type.action}
        />
      ))}
    </div>
  );
};

export default InlineStyleButton;
