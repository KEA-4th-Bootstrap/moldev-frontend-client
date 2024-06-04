import EmbeddingContainer from '../components/writePage/EmbeddingContainer';
import { embeddingType } from '../data/type';

const EmbeddingPage = ({
  onClose,
  onEmbedding,
}: {
  onClose: () => void;
  onEmbedding: (embeddingItem: embeddingType) => void;
}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-20"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={`min-w-[1000px] min-h-[600px] w-5/6 h-[90%] rounded-modal bg-white shadow-modal flex flex-col gap-y-40 p-24 relative`}
      >
        <EmbeddingContainer onClose={onClose} onEmbedding={onEmbedding} />
      </div>
    </div>
  );
};

export default EmbeddingPage;
