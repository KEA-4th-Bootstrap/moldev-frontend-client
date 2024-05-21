import { useEffect, useRef, useState } from 'react';
import { categoryType } from '../../data/type';
import { EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Editor from '@draft-js-plugins/editor';

export const useWrite = () => {
  const editorRef = useRef<Editor>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [category, setCategory] = useState<categoryType | null>(null);
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const getBlockStyle = (block: any): string => {
    switch (block.getType()) {
      case 'left':
        return 'align-left';
      case 'center':
        return 'align-center';
      case 'right':
        return 'align-right';
      default:
        return 'unstyled';
    }
  };

  useEffect(() => {
    const options = {
      blockStyleFn: (block: any) => {
        if (
          block.getType() === 'left' ||
          block.getType() === 'center' ||
          block.getType() === 'right'
        ) {
          return {
            style: {
              'text-align': block.getType(),
            },
          };
        }
      },
    };

    console.log(stateToHTML(editorState.getCurrentContent(), options));
    console.log('메세지 : ', editorState.getCurrentContent().getPlainText());
    console.log('내용 오리진 : ', editorState.getCurrentContent());
  }, [editorState]);

  return {
    editorRef,
    isUploadOpen,
    setIsUploadOpen,
    isCategoryOpen,
    setIsCategoryOpen,
    category,
    setCategory,
    title,
    setTitle,
    editorState,
    setEditorState,
    toggleBlockType,
    toggleInlineStyle,
    getBlockStyle,
  };
};
