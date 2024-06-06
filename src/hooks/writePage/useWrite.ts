import { useCallback, useEffect, useRef, useState } from 'react';
import { categoryType, embeddingType } from '../../data/type';
import {
  AtomicBlockUtils,
  // DraftHandleValue,
  EditorState,
  RichUtils,
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Editor from '@draft-js-plugins/editor';
import { postImageApi, postWriteApi } from '../../api/postApi';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getMoldevId } from '../../api/manageLocalStorage';
// import EmbeddingBlock from '../../components/writePage/EmbeddingBlock';
import { CustomError } from '../../api/customError';
import useAuthStore from '../../store/useAuthStore';

export const useWrite = () => {
  const { logout } = useAuthStore();
  const moldevId = getMoldevId();
  const navigate = useNavigate();
  const [isEmbeddingOpen, setIsEmbeddingOpen] = useState(false);
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
        const error = err as CustomError;
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
          logout();
        }
      },
    },
  );

  const { mutate: tryPostWrite, isLoading: tryPostIsLoading } = useMutation(
    ({
      title,
      moldevId,
      content,
      profileContent,
      thumbnail,
      images,
      category,
    }: {
      title: string;
      moldevId: string;
      content: string;
      profileContent: string;
      thumbnail: string;
      images: string[];
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
        navigate(`/${moldevId}`);
      },
      onError: (err) => {
        console.log('글 작성 실패 --> ', err);
        const error = err as CustomError;
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
          logout();
        }
      },
    },
  );

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

  const onUploadPostClick = () => {
    // const current = draftToHTML();
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
      console.log('이미지 : ', images);
      console.log('카테고리 : ', category);
      tryPostWrite({
        title: title,
        moldevId: moldevId || '',
        content: stateToHTML(editorState.getCurrentContent()),
        profileContent: editorState.getCurrentContent().getPlainText(),
        thumbnail: thumbnail,
        images: images,
        category: category,
      });

      setIsUploadOpen(false);
    }
  };

  const onAddEmbedding = (item: embeddingType) => {
    const { title, content, thumbnail, category, url } = item;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'embedding',
      'IMMUTABLE',
      {
        title: title,
        content: content,
        thumbnail: thumbnail,
        category: category,
        url: url,
      },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
    );
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

  // const blockRenderFn = (contentBlock: any) => {
  //   const type = contentBlock.getType();
  //   if (type === 'atomic') {
  //     const entity = contentBlock.getEntityAt(0);
  //     if (!entity) return null;
  //     const entityData = editorState.getCurrentContent().getEntity(entity);
  //     const entityType = entityData.getType();
  //     if (entityType === 'embedding') {
  //       return {
  //         component: EmbeddingBlock,
  //         editable: false,
  //       };
  //     }
  //   }

  //   return null;
  // };

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

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    tryUploadImage(file);
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

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

  // const insertEmbedding = (item: embeddingType) => {
  //   const contentState = editorState.getCurrentContent();
  //   const contentStateWithEntity = contentState.createEntity(
  //     'embedding',
  //     'IMMUTABLE',
  //     {
  //       title: item.title,
  //       content: item.content,
  //       thumbnail: item.thumbnail,
  //       category: item.category,
  //       url: item.url,
  //     },
  //   );
  //   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  //   const newEditorState = EditorState.set(editorState, {
  //     currentContent: contentStateWithEntity,
  //   });
  //   setEditorState(
  //     AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
  //   );
  // };

  const onClickEmbeddingButton = () => {
    setIsEmbeddingOpen(true);
  };

  const onClickEmbeddingClose = () => {
    setIsEmbeddingOpen(false);
  };

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  // const draftToHTML = () => {
  //   const rawContentState = convertToRaw(editorState.getCurrentContent());
  //   const markup = draftToHtml(rawContentState, {}, false, (entity) => {
  //     if (entity.type === 'embedding') {
  //       const data = entity.data;
  //       return `<a href="${data.url}" target="_blank" rel="noopener noreferrer">
  //   <div class="embedding-block">
  //     <img src="${data.thumbnail}" alt="link" class="embedding-thumbnail" />
  //     <div class="embedding-content">
  //       <div class="embedding-category">${data.category}</div>
  //       <div class="embedding-title">${data.title}</div>
  //       <div class="embedding-description">${data.content}</div>
  //       <div class="embedding-url">${data.url}</div>
  //     </div>
  //   </div>
  // </a>`;
  //     }
  //   });
  //   return markup;
  // };

  // const handlePastedFiled = (files: Blob[]): DraftHandleValue => {
  //   postImageApi(files[0] as File)
  //     .then((res) => {
  //       console.log(res);
  //       insertImage(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   return 'handled';
  // };

  // const insertImage = (url: string) => {
  //   const contentState = editorState.getCurrentContent();
  //   const contentStateWithEntity = contentState.createEntity(
  //     'image',
  //     'IMMUTABLE',
  //     { src: url },
  //   );
  //   const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  //   const newEditorState = EditorState.set(editorState, {
  //     currentContent: contentStateWithEntity,
  //   });
  //   setEditorState(
  //     AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '),
  //   );
  // };

  // const blockRenderMap = DefaultDraftBlockRenderMap.merge(
  //   Immutable.Map({
  //     atomic: {
  //       element: 'div',
  //     },
  //   }),
  // );

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
    // handlePastedFiled,
    onUpload,
    onUploadImageButtonClick,
    inputRef,
    images,
    thumbnail,
    setThumbnail,
    onUploadPostClick,
    tryPostIsLoading,
    handleEditorChange,
    onClickEmbeddingButton,
    onClickEmbeddingClose,
    isEmbeddingOpen,
    onAddEmbedding,
    // blockRenderFn,
  };
};
