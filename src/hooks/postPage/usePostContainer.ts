import { useEffect, useState } from 'react';
import usePost from './usePost';
import {
  ContentBlock,
  ContentState,
  EditorState,
  RawDraftEntity,
} from 'draft-js';
import { useMutation } from 'react-query';
import { deletePostApi } from '../../api/postApi';
import { useNavigate } from 'react-router-dom';
import EmbeddingBlock from '../../components/writePage/EmbeddingBlock';
import ImageBlock from '../../components/writePage/ImageBlock';
import htmlToDraft from 'html-to-draftjs';

export const usePostContainer = (moldevId: string, postId: number) => {
  const { post, postIsLoading, postIsError } = usePost(moldevId, postId);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isReportOpen, setIsReportOpen] = useState(false);
  const navigate = useNavigate();

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

  const onMoveToEdit = (postId: number) => {
    console.log('게시글 수정으로 이동 --> ', postId);
    navigate(`/edit/${postId}`);
  };

  const { mutate: tryDeletePost } = useMutation(
    (postId: number) => deletePostApi(postId),
    {
      onSuccess: (data) => {
        console.log('게시글 삭제 성공 --> ', data);
        navigate(-1);
      },
      onError: (error) => {
        console.log('게시글 삭제 실패 --> ', error);
      },
    },
  );

  return {
    post,
    postIsLoading,
    postIsError,
    editorState,
    setEditorState,
    onMoveToEdit,
    tryDeletePost,
    blockRendererFn,
    isReportOpen,
    setIsReportOpen,
  };
};
