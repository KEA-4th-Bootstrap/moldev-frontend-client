import { ContentBlock, ContentState } from 'draft-js';
import React from 'react';

interface ImageBlockProps {
  block: ContentBlock;
  contentState: ContentState;
}

const ImageBlock = ({ block, contentState }: ImageBlockProps) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();

  return <img src={src} alt="이미지" className="image-block" />;
};

export default ImageBlock;
