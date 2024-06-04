import { useEffect, useState } from 'react';
import usePost from './usePost';
import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useMutation } from 'react-query';
import { deletePostApi } from '../../api/postApi';
import { useNavigate } from 'react-router-dom';
import EmbeddingBlock from '../../components/writePage/EmbeddingBlock';

export const usePostContainer = (moldevId: string, postId: number) => {
  const { post, postIsLoading, postIsError } = usePost(moldevId, postId);
  const postToHtml: string | TrustedHTML = post?.postInfo.content || '';
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const navigate = useNavigate();

  useEffect(() => {
    if (!post) return;
    const blocksFromHtml = htmlToDraft(post.postInfo.content);
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

  const blockRenderFn = (contentBlock: any) => {
    const type = contentBlock.getType();
    if (type === 'atomic') {
      const entity = contentBlock.getEntityAt(0);
      if (!entity) return null;
      const entityData = editorState.getCurrentContent().getEntity(entity);
      const entityType = entityData.getType();
      if (entityType === 'embedding') {
        return {
          component: EmbeddingBlock,
          editable: false,
        };
      }
    }

    return null;
  };

  return {
    post,
    postToHtml,
    postIsLoading,
    postIsError,
    editorState,
    setEditorState,
    onMoveToEdit,
    tryDeletePost,
    blockRenderFn,
  };
};
