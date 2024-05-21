import { useEffect, useState } from 'react';
import usePost from './usePost';
import { ContentState, EditorState } from 'draft-js';
import { commentType, recentListItemType } from '../../data/type';
import htmlToDraft from 'html-to-draftjs';
import { dummyCommetList, dummyRecentList } from '../../data/dummy';

export const usePostContainer = (postId: number) => {
  const post = usePost(postId);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [recentList, setRecentList] = useState<recentListItemType[]>([]);
  const [commentList, setCommentList] = useState<commentType[]>([]);

  useEffect(() => {
    if (!post) return;
    const blocksFromHtml = htmlToDraft(post.content);
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
    setCommentList(dummyCommetList);
  }, []);

  return { post, editorState, recentList, commentList, setEditorState };
};
