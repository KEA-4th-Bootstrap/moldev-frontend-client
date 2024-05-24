import { useEffect, useState } from 'react';
import usePost from './usePost';
import { ContentState, EditorState } from 'draft-js';
import { recentListItemType } from '../../data/type';
import htmlToDraft from 'html-to-draftjs';
import { dummyRecentList } from '../../data/dummy';

export const usePostContainer = (moldevId: string, postId: number) => {
  const { post, postIsLoading, postIsError } = usePost(moldevId, postId);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recentList, setRecentList] = useState<recentListItemType[]>([]);

  useEffect(() => {
    if (!post) return;
    const blocksFromHtml = htmlToDraft(post.postInfo.content);
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

  useEffect(() => {
    setRecentList(dummyRecentList);
  }, []);

  return {
    post,
    postIsLoading,
    postIsError,
    editorState,
    recentList,
    setEditorState,
  };
};
