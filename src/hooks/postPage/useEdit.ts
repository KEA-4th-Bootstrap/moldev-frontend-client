import { useCallback, useEffect, useRef, useState } from 'react';
import { categoryType, embeddingType } from '../../data/type';
import {
  AtomicBlockUtils,
  ContentBlock,
  ContentState,
  EditorState,
  RawDraftEntity,
  RichUtils,
} from 'draft-js';
import { Options, stateToHTML } from 'draft-js-export-html';
import Editor from '@draft-js-plugins/editor';
import {
  getPostImagesApi,
  patchPostApi,
  postImageApi,
} from '../../api/postApi';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getMoldevId } from '../../api/manageLocalStorage';
import htmlToDraft from 'html-to-draftjs';
import usePost from './usePost';
import EmbeddingBlock from '../../components/writePage/EmbeddingBlock';
import ImageBlock from '../../components/writePage/ImageBlock';
import useAuthStore from '../../store/useAuthStore';
import { CustomError } from '../../api/customError';

export const useEdit = () => {
  const { logout } = useAuthStore();
  const { postId } = useParams();
  const moldevId = getMoldevId();
  const { post } = usePost(moldevId || '', Number(postId || 0));
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [category, setCategory] = useState<categoryType | null>(null);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string>('');
  const [isEmbeddingOpen, setIsEmbeddingOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const blockRendererFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === 'atomic') {
      const entity = contentBlock.getEntityAt(0);
      if (entity) {
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
    }
    return null;
  };

  const customBlockFn = (
    nodeName: string,
    node: HTMLElement,
  ): RawDraftEntity | undefined => {
    console.log('NODE NAME --> ', nodeName);
    console.log('NODE --> ', node);
    if (nodeName === 'div' && node.className.includes('embedding-block')) {
      console.log('EMBEDDING BLOCK --> ', node);
      const img = node.getElementsByTagName('img')[0] as HTMLImageElement;
      const title =
        node.getElementsByClassName('embedding-title')[0]?.textContent || '';
      const category =
        node.getElementsByClassName('embedding-category')[0]?.textContent || '';
      const url = node.getElementsByTagName('a')[0]?.href || '';

      return {
        type: 'EMBED',
        mutability: 'IMMUTABLE',
        data: {
          title,
          thumbnail: img.src,
          category,
          url,
        },
      };
    }
    if (nodeName === 'img' && node.className.includes('image-block')) {
      console.log('IMAGE BLOCK --> ', node);
      const imgElement = node as HTMLImageElement;
      return {
        type: 'IMAGE',
        mutability: 'IMMUTABLE',
        data: {
          src: imgElement.src,
        },
      };
    }
    return undefined;
  };

  useEffect(() => {
    if (!post) return;
    setTitle(post.postInfo.title);
    setCategory(post.postInfo.category || 'ACTIVITY');
    setThumbnail(post.postInfo.thumbnail);
    // setImages([post.postInfo.thumbnail]);
    const blocksFromHtml = htmlToDraft(post.postInfo.content, customBlockFn);
    console.log('HTML TO DRAFT --> ', blocksFromHtml);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      console.log(contentBlocks, entityMap);
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap,
      );
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [post]);

  const { isLoading: imagesIsLoading, isError: imagesIsError } = useQuery(
    `images-${postId}`,
    () =>
      getPostImagesApi(Number(postId || 0)).then(
        (res) => res.data.data.data.images,
      ),
    {
      enabled: !!postId,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onSuccess: (data) => {
        console.log('이미지 가져오기 성공 --> ', data);
        setImages(data);
      },
      onError: (err) => {
        console.log('이미지 가져오기 실패 --> ', err);
        const error = err as CustomError;
        if (error.response?.status === 401) {
          alert('로그인이 필요합니다.');
          logout();
        }
      },
    },
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

  const { mutate: tryPostWrite, isLoading: tryEditIsLoading } = useMutation(
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
      patchPostApi(
        Number(postId || 0),
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
        console.log('글 수정 성공 --> ', data);
        navigate(`/${moldevId}/${postId}`, { replace: true });
      },
      onError: (err) => {
        console.log('글 수정 실패 --> ', err);
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
          if (entityType === 'image' || entityType === 'IMAGE') {
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
      console.log('카테고리 : ', category);
      console.log('이미지 : ', images);
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
    toggleBlockType,
    toggleInlineStyle,
    getBlockStyle,
    onUpload,
    onUploadImageButtonClick,
    inputRef,
    images,
    thumbnail,
    setThumbnail,
    onUploadPostClick,
    tryEditIsLoading,
    imagesIsLoading,
    imagesIsError,
    handleEditorChange,
    onAddEmbedding,
    onClickEmbeddingButton,
    isEmbeddingOpen,
    onClickEmbeddingClose,
    blockRendererFn,
  };
};
