import React from 'react';
import ToolbarButton from './ToolbarButton';

const blockButtonOptions = [
  { name: 'icon_align_left.svg', action: 'left' },
  { name: 'icon_align_center.svg', action: 'center' },
  { name: 'icon_align_right.svg', action: 'right' },
  { name: 'icon_header-1.svg', action: 'header-one' },
  { name: 'icon_header-2.svg', action: 'header-two' },
  { name: 'icon_header-3.svg', action: 'header-three' },
  { name: 'icon_list-bulleted.svg', action: 'unordered-list-item' },
  { name: 'icon_list-numbered.svg', action: 'ordered-list-item' },
  { name: 'icon_code.svg', action: 'code-block' },
  { name: 'icon_quotes.svg', action: 'blockquote' },
];

const BlockStyleButton = (props: any) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="toolbar__controls flex items-center justify-start gap-x-4">
      {blockButtonOptions.map((type, index) => (
        <ToolbarButton
          key={index}
          img={type.name}
          className={`toolbar__button--${type.action}`}
          active={type.action === blockType}
          onToggle={props.onToggle}
          style={type.action}
        />
      ))}
    </div>
  );
};

export default BlockStyleButton;
