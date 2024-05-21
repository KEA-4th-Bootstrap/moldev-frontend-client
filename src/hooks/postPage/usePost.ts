import { useEffect, useState } from 'react';
import { postListItemType } from '../../data/type';
import { dummyPost } from '../../data/dummy';

const usePost = (articleId: number) => {
  const [article, setArticle] = useState<postListItemType | null>(null);

  useEffect(() => {
    if (!articleId) return;

    // fetch article data
    console.log('articleID:', articleId);
    setArticle(dummyPost);
  }, [articleId]);

  return article;
};

export default usePost;
