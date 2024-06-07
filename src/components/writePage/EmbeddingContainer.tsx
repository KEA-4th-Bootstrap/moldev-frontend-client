import RectButton from '../common/RectButton';
import { ReactComponent as Prev } from '../../assets/icons/icon_prev.svg';
import { useEmbedding } from '../../hooks/writePage/useEmbedding';
import { ReactComponent as Pin } from '../../assets/icons/icon_pin.svg';
import { ReactComponent as CheckMain } from '../../assets/icons/icon_check_main.svg';
import { ReactComponent as DownArrow } from '../../assets/icons/arrow_down_gray_200.svg';
import { ReactComponent as Image } from '../../assets/icons/icon_image.svg';
import { categoryToKorean, embeddingType } from '../../data/type';
import RoundButton from '../common/RoundButton';
import createImagePlugin from '@draft-js-plugins/image';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import BlockStyleButton from './BlockStyleButton';
import InlineStyleButton from './InlineStyleButton';
import Editor from '@draft-js-plugins/editor';

const linkifyPlugin = createLinkifyPlugin({
  component: (props) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        window.open(props.href, '_blank');
      }}
    >
      <div className="border border-gray-100 flex items-center justify-start rounded-sm">
        <img
          src={
            'https://www.padi.co.kr/sites/default/files/images/2019-02/maldives.jpg'
          }
          alt="link"
          className="w-[200px] h-[100px] object-cover"
        />
        <div className="flex flex-col justify-center items-start p-16 gap-y-6">
          <div className="flex items-center justify-start gap-x-8">
            <div className="text-14 font-medium">
              링크로 이동하려면 누르세요.
            </div>
          </div>
          <div className="text-xs text-gray-500">{props.href}</div>
        </div>
      </div>
    </a>
  ),
});
const imagePlugin = createImagePlugin();
const plugins = [linkifyPlugin, imagePlugin];

const EmbeddingContainer = ({
  onClose,
  onEmbedding,
}: {
  onClose: () => void;
  onEmbedding: (embeddingItem: embeddingType) => void;
}) => {
  const {
    editorRef,
    inputRef,
    images,
    thumbnail,
    setThumbnail,
    isUploadOpen,
    isCategoryOpen,
    category,
    title,
    editorState,
    toggleBlockType,
    toggleInlineStyle,
    getBlockStyle,
    setIsUploadOpen,
    setIsCategoryOpen,
    setCategory,
    setTitle,
    onUpload,
    onUploadImageButtonClick,
    handlePastedFiled,
    handleEditorChange,
    onUploadPostClick,
    tryPostIsLoading,
  } = useEmbedding(onClose, onEmbedding);
  return (
    <div className="w-full min-h-full h-full flex flex-col items-center justify-start">
      <div className="shrink-0 w-full flex items-center justify-between pb-20 border-b-[0.5px] border-gray-100">
        <Prev className="cursor-pointer" onClick={onClose} height={48} />
        <div className="flex items-center justify-end relative">
          <RectButton
            text="등록"
            type="fill"
            h={'45px'}
            onClick={() => {
              setIsUploadOpen(!isUploadOpen);
            }}
          />
          <div
            className={`${isUploadOpen ? 'flex' : 'hidden'} absolute w-[305px] top-[50px] right-0 z-20 flex-col items-center justify-center gap-y-30 px-16 py-20 border border-gray-50 shadow-block bg-white`}
          >
            <div className="w-full flex flex-col gap-y-6">
              <div className="font-medium">카테고리</div>
              <div
                className={`${isCategoryOpen ? 'h-[200px]' : 'h-[42px]'} transition-all duration-100 flex flex-col items-start justify-start pl-16 pr-8 py-7 gap-y-10 rounded-[10px] border border-gray-50 overflow-hidden cursor-pointer`}
              >
                <div
                  className="w-full flex items-center justify-between pb-5"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  <div className="flex items-center justify-start gap-x-10">
                    <Pin />
                    <div onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                      {category ? categoryToKorean[category] : '카테고리 선택'}
                    </div>
                  </div>
                  <DownArrow
                    className={`${isCategoryOpen ? 'transform rotate-180' : 'transform rotate-0'} transition-transform duration-100`}
                  />
                </div>
                <div className="w-full flex items-center justify-start gap-x-10">
                  <CheckMain
                    className={`${category === 'PROJECT' ? 'visible' : 'invisible'}`}
                  />
                  <div
                    className={`${category === 'PROJECT' ? 'font-semibold text-black' : 'text-gray-500'} cursor-pointer`}
                    onClick={() => {
                      setCategory('PROJECT');
                      setIsCategoryOpen(false);
                    }}
                  >
                    프로젝트
                  </div>
                </div>
                <div className="w-full flex items-center justify-start gap-x-10">
                  <CheckMain
                    className={`${category === 'ACTIVITY' ? 'visible' : 'invisible'}`}
                  />
                  <div
                    className={`${category === 'ACTIVITY' ? 'font-semibold text-black' : 'text-gray-500'} cursor-pointer`}
                    onClick={() => {
                      setCategory('ACTIVITY');
                      setIsCategoryOpen(false);
                    }}
                  >
                    대외활동
                  </div>
                </div>
                <div className="w-full flex items-center justify-start gap-x-10">
                  <CheckMain
                    className={`${category === 'AWARDS' ? 'visible' : 'invisible'}`}
                  />
                  <div
                    className={`${category === 'AWARDS' ? 'font-semibold text-black' : 'text-gray-500'} cursor-pointer`}
                    onClick={() => {
                      setCategory('AWARDS');
                      setIsCategoryOpen(false);
                    }}
                  >
                    수상이력
                  </div>
                </div>
                <div className="w-full flex items-center justify-start gap-x-10">
                  <CheckMain
                    className={`${category === 'TROUBLE' ? 'visible' : 'invisible'}`}
                  />
                  <div
                    className={`${category === 'TROUBLE' ? 'font-semibold text-black' : 'text-gray-500'} cursor-pointer`}
                    onClick={() => {
                      setCategory('TROUBLE');
                      setIsCategoryOpen(false);
                    }}
                  >
                    트러블슈팅
                  </div>
                </div>
              </div>
            </div>
            <RoundButton
              type="fill"
              text="포스트 업로드"
              onClick={onUploadPostClick}
              h={'37px'}
              w={'273px'}
              fontSize={16}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-start justify-start grow overflow-hidden gap-x-20">
        <div className="grow h-full flex flex-col items-start justify-start relative overflow-y-scroll">
          <div className="absolute top-0 w-full py-8 z-10 flex items-center justify-start bg-white border-b border-gray-50">
            <BlockStyleButton
              editorState={editorState}
              onToggle={toggleBlockType}
            />
            <InlineStyleButton
              editorState={editorState}
              onToggle={toggleInlineStyle}
            />
            <div className="flex items-center justify-start gap-4 px-4">
              <Image
                className="cursor-pointer"
                width={24}
                height={24}
                onClick={onUploadImageButtonClick}
              />
            </div>
            <input
              ref={inputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={onUpload}
            />
          </div>
          <div className="editor w-full grow ">
            <div className="w-full pt-30 pb-20 px-24 bg-white mt-[50px]">
              <input
                type="text"
                placeholder="제목을 입력하세요"
                className="w-full h-14 text-3xl font-bold outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="w-full h-[1px] bg-gray-100 mt-20"></div>
            </div>
            <Editor
              plugins={plugins}
              editorState={editorState}
              onChange={handleEditorChange}
              handlePastedFiles={handlePastedFiled}
              // handleKeyCommand={handleKeyCommand}
              blockStyleFn={getBlockStyle}
              placeholder="내용을 입력하세요."
              ref={editorRef}
            />
          </div>
        </div>
        <div className="min-w-[200px] w-1/5 h-full overflow-y-scroll bg-white py-30 px-16">
          <div className="font-bold text-18">대표 사진</div>
          <div className="w-full h-px bg-gray-50 my-20" />
          <div className="w-full flex flex-col gap-y-16">
            {images.length < 1 ? (
              <div className="w-full text-center text-14 text-gray-600">
                대표 사진 설정을 위해
                <br /> 이미지를 업로드해주세요.
              </div>
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="image"
                  className={`w-full h-auto object-cover rounded-sm ${
                    thumbnail === image ? 'border-2 border-blue-500' : ''
                  }`}
                  onClick={() => setThumbnail(image)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {tryPostIsLoading && (
        <div className="fixed w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="w-[200px] h-[200px] flex items-center justify-center bg-white rounded-lg">
            <div className="w-10 h-10 border-2 border-t-[4px] border-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbeddingContainer;
