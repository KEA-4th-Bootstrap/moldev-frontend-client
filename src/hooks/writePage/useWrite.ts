import { useCallback, useEffect, useRef, useState } from 'react';
import { categoryType } from '../../data/type';
import {
  AtomicBlockUtils,
  DraftHandleValue,
  EditorState,
  RichUtils,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Editor from '@draft-js-plugins/editor';
import { postImageApi, postWriteApi } from '../../api/postApi';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getMoldevId } from '../../api/manageLocalStorage';

export const useWrite = () => {
  const moldevId = getMoldevId();
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string>('');
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

  const insertImage = (url: string) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: url },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
    );
  };

  const { mutate: tryUploadImage } = useMutation(
    (file: File) => postImageApi(file),
    {
      onSuccess: (res) => {
        insertImage(res.data.data.data);
        if (images.length === 0) {
          setThumbnail(res.data.data.data);
        }
        setImages([...images, res.data.data.data]);
        console.log('이미지 업로드 성공 --> ', res);
      },
      onError: (err) => {
        console.log('이미지 업로드 실패 --> ', err);
      },
    },
  );

  const handlePastedFiled = (files: Blob[]): DraftHandleValue => {
    postImageApi(files[0] as File)
      .then((res) => {
        console.log(res);
        insertImage(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return 'handled';
  };

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    tryUploadImage(file);
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const { mutate: tryPostWrite, isLoading: tryPostIsLoading } = useMutation(
    ({
      title,
      moldevId,
      content,
      profileContent,
      thumbnail,
      category,
    }: {
      title: string;
      moldevId: string;
      content: string;
      profileContent: string;
      thumbnail: string;
      category: categoryType;
    }) =>
      postWriteApi(
        title,
        moldevId,
        content,
        profileContent,
        thumbnail,
        images,
        category,
      ),
    {
      onSuccess: (data) => {
        console.log('글 작성 성공 --> ', data);
        navigate(-1);
      },
      onError: (error) => {
        console.log('글 작성 실패 --> ', error);
      },
    },
  );

  const onUploadPostClick = () => {
    if (!category) {
      alert('카테고리를 입력해주세요.');
    } else if (!title) {
      alert('제목을 입력해주세요.');
    } else if (!thumbnail) {
      alert('대표 사진을 등록해주세요.');
    } else if (editorState.getCurrentContent().getPlainText().length === 0) {
      alert('내용을 입력해주세요.');
    } else {
      console.log('업로드 시도');
      console.log('제목 : ', title);
      console.log('내용 : ', stateToHTML(editorState.getCurrentContent()));
      console.log(
        '순수 글자 : ',
        editorState.getCurrentContent().getPlainText(),
      );
      console.log('대표 사진 : ', thumbnail);
      console.log('카테고리 : ', category);
      tryPostWrite({
        title: title,
        moldevId: moldevId || '',
        content: stateToHTML(editorState.getCurrentContent()),
        profileContent: editorState.getCurrentContent().getPlainText(),
        thumbnail: thumbnail,
        category: category,
      });

      setIsUploadOpen(false);
    }
  };

  const handleEditorChange = (newEditorState: EditorState) => {
    const contentState = newEditorState.getCurrentContent();
    const lastChangeType = newEditorState.getLastChangeType();

    if (
      lastChangeType === 'remove-range' ||
      lastChangeType === 'backspace-character' ||
      lastChangeType === 'delete-character'
    ) {
      const blockMap = contentState.getBlockMap();

      const currentImageEntities = blockMap
        .filter((block) => block?.getType() === 'atomic')
        .map((block) => {
          if (!block) return null;
          const entityKey = block.getEntityAt(0);
          if (!entityKey) return null;
          const entity = contentState.getEntity(entityKey);
          const entityType = entity.getType();
          if (entityType === 'image') {
            return entity.getData().src;
          }
          return null;
        })
        .filter(Boolean)
        .toSet();

      const newImages = images.filter((img) => currentImageEntities.has(img));
      console.log('이미지 삭제 전 --> ', images);
      console.log('이미지 삭제 후 --> ', newImages);
      if (!newImages.includes(thumbnail!)) {
        setThumbnail(newImages.length > 0 ? newImages[0] : '');
      }
      setImages(newImages);
    }

    setEditorState(newEditorState);
  };

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
    toggleBlockType,
    toggleInlineStyle,
    getBlockStyle,
    handlePastedFiled,
    onUpload,
    onUploadImageButtonClick,
    inputRef,
    images,
    thumbnail,
    setThumbnail,
    onUploadPostClick,
    tryPostIsLoading,
    handleEditorChange,
  };
};
