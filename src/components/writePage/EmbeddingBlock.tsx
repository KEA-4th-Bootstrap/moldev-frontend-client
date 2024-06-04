import React from 'react';
import { ContentBlock, ContentState } from 'draft-js';
import { embeddingType } from '../../data/type';

interface EmbeddingBlockProps {
  block: ContentBlock;
  contentState: ContentState;
}

const EmbeddingBlock = (props: EmbeddingBlockProps) => {
  const { contentState, block } = props;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { title, content, thumbnail, category, url } =
    entity.getData() as embeddingType;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="embedding-block">
        <img src={thumbnail} alt="link" className="embedding-thumbnail" />
        <div className="embedding-content">
          <div className="embedding-category">{category}</div>
          <div className="embedding-title">{title}</div>
          <div className="embedding-description">{content}</div>
          <div className="embedding-url">{url}</div>
        </div>
      </div>
    </a>
  );
};

export default EmbeddingBlock;
