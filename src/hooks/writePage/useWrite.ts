import { useCallback, useRef, useState } from 'react';
import { categoryType, embeddingType } from '../../data/type';
import {
  AtomicBlockUtils,
  ContentBlock,
  // DraftHandleValue,
  EditorState,
  RichUtils,
} from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import { postImageApi, postWriteApi } from '../../api/postApi';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getMoldevId } from '../../api/manageLocalStorage';
// import EmbeddingBlock from '../../components/writePage/EmbeddingBlock';
import { CustomError } from '../../api/customError';
import useAuthStore from '../../store/useAuthStore';
import { Options, stateToHTML } from 'draft-js-export-html';
import EmbeddingBlock from '../../components/writePage/EmbeddingBlock';
import ImageBlock from '../../components/writePage/ImageBlock';

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
          if (entityType === 'IMAGE') {
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
    if (!category) {
      alert('카테고리를 입력해주세요.');
    } else if (!title) {
      alert('제목을 입력해주세요.');
    } else if (!thumbnail) {
      alert('대표 사진을 등록해주세요.');
    } else if (editorState.getCurrentContent().getPlainText().length === 0) {
      alert('내용을 입력해주세요.');
    } else {
      const content = exportToHTML();
      console.log('업로드 시도');
      console.log('제목 : ', title);
      console.log('내용 : ', content);
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
        content: content,
        profileContent: editorState.getCurrentContent().getPlainText(),
        thumbnail: thumbnail,
        images: images,
        category: category,
      });

      setIsUploadOpen(false);
    }
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
      'IMAGE',
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

  const onAddEmbedding = (item: embeddingType) => {
    const { title, thumbnail, category, url } = item;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'EMBED',
      'IMMUTABLE',
      {
        title: title,
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

  const blockRendererFn = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === 'atomic') {
      const entity = contentBlock.getEntityAt(0);

      if (!entity) return null;

      const contentState = editorState.getCurrentContent();
      const entityType = contentState.getEntity(entity).getType();

      if (entityType === 'EMBED') {
        return {
          component: EmbeddingBlock,
          editable: false,
        };
      }

      if (entityType === 'IMAGE') {
        return {
          component: ImageBlock,
          editable: false,
        };
      }
    }
  };

  const exportToHTML = () => {
    const contentState = editorState.getCurrentContent();
    const options: Options = {
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
      blockRenderers: {
        atomic: (block: any): string => {
          const entity = block.getEntityAt(0);
          if (entity) {
            const entityType = contentState.getEntity(entity).getType();
            if (entityType === 'EMBED') {
              const { title, thumbnail, category, url } = contentState
                .getEntity(entity)
                .getData();
              return `
                <div class="embedding-block">
                  <a href="${url}" target="_blank" rel="noopener noreferrer" class="embedding-anchor">
                    <img src="${thumbnail}" alt="${title}" class="embedding-thumbnail" />
                    <div class="embedding-content">
                      <div class="embedding-category">${category}</div>
                      <div class="embedding-title">${title}</div>
                      <div class="embedding-url">${url}</div>
                    </div>
                  </a>
                </div>
              `;
            }
            if (entityType === 'IMAGE') {
              const { src } = contentState.getEntity(entity).getData();
              return `
                <img src="${src}" alt="이미지" class="image-block" />
              `;
            }
          }
          return ''; // Always return a string
        },
      },
    };
    const html = stateToHTML(contentState, options);

    return html;
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
    blockRendererFn,
  };
};
