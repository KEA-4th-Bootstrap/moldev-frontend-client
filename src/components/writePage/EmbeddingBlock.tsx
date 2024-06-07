import React from 'react';
import { ContentBlock, ContentState } from 'draft-js';

interface EmbeddingBlockProps {
  block: ContentBlock;
  contentState: ContentState;
}

const EmbeddingBlock = (props: EmbeddingBlockProps) => {
  const { block, contentState } = props;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { title, thumbnail, category, url } = entity.getData();

  return (
    <div className="embedding-block">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="embedding-anchor"
      >
        <img src={thumbnail} alt={title} className="embedding-thumbnail" />
        <div className="embedding-content">
          <div className="embedding-category">{category}</div>
          <div className="embedding-title">{title}</div>
          <div className="embedding-url">{url}</div>
        </div>
      </a>
    </div>
  );
};

export default EmbeddingBlock;
