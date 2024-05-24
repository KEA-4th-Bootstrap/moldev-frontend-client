import Editor from '@draft-js-plugins/editor';
import { ReactComponent as Logo } from '../assets/logo/logo_text.svg';
import RectButton from '../components/common/RectButton';
import BlockStyleButton from '../components/writePage/BlockStyleButton';
import InlineStyleButton from '../components/writePage/InlineStyleButton';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import { categoryToKorean } from '../data/type';
import { ReactComponent as Pin } from '../assets/icons/icon_pin.svg';
import { ReactComponent as CheckMain } from '../assets/icons/icon_check_main.svg';
import { ReactComponent as DownArrow } from '../assets/icons/arrow_down_gray_200.svg';
import RoundButton from '../components/common/RoundButton';
import { useWrite } from '../hooks/writePage/useWrite';

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
const plugins = [linkifyPlugin];

const WritePage = () => {
  const {
    editorRef,
    isUploadOpen,
    setIsUploadOpen,
    isCategoryOpen,
    setIsCategoryOpen,
    category,
    setCategory,
    title,
    setTitle,
    editorState,
    setEditorState,
    toggleBlockType,
    toggleInlineStyle,
    getBlockStyle,
  } = useWrite();
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-start">
      <div className="shrink-0 w-full flex items-center justify-between px-16 py-20 border-b-[0.5px] border-gray-100">
        <Logo />
        <div className="flex items-center justify-end relative">
          <RectButton
            text="업로드"
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
              onClick={() => setIsUploadOpen(false)}
              h={'37px'}
              w={'273px'}
              fontSize={16}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-start grow bg-gray-50 overflow-hidden">
        <div className="w-full px-16 py-8 z-10 flex items-center justify-start border-b-[0.5px] border-gray-100 bg-white shadow-toolbar">
          <BlockStyleButton
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleButton
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />
        </div>
        <div className="editor grow w-4/6 py-60 bg-white shadow-editor overflow-y-scroll">
          <div className="w-full pt-30 pb-20 px-24 bg-white">
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
            onChange={setEditorState}
            // handleKeyCommand={handleKeyCommand}
            blockStyleFn={getBlockStyle}
            placeholder="내용을 입력하세요."
            ref={editorRef}
          />
        </div>
      </div>
    </div>
  );
};

export default WritePage;
