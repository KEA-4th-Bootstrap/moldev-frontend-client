import { reportReasonToKorean, reportType } from '../../data/type';
import { ReactComponent as Close } from '../../assets/icons/icon_close_gray_800.svg';
import { ReactComponent as Down } from '../../assets/icons/arrow_down_gray_600.svg';
import ReportTypeTag from './ReportTypeTag';
import { useReport } from '../../hooks/postPage/useReport';
import ReportProcessItem from './ReportProcessItem';
import RectButton from '../common/RectButton';

const ReportContainer = ({
  type,
  contentId,
  reporterId,
  reporteeId,
  onClose,
}: {
  type: reportType;
  contentId: string | number;
  reporterId: string;
  reporteeId: string;
  onClose: () => void;
}) => {
  const {
    isReasonOpen,
    reason,
    onReasonClick,
    handleReasonType,
    onReportClick,
    onCancelClick,
  } = useReport(type, contentId, reporterId, reporteeId, onClose);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 rounded-modal">
      <div className="min-w-[600px] max-w-[800px] w-1/3 flex flex-col gap-y-30 items-center justify-center pt-36 px-40 rounded-modal bg-white relative">
        <Close
          width={28}
          height={28}
          className="absolute top-[20px] right-[20px] cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        />
        <div className="font-bold text-24 text-black">신고 하기</div>
        <div className="w-full flex flex-col items-start justify-start gap-y-16">
          <div className="w-full flex items-center justify-start gap-x-20">
            <div className="font-semibold text-14 text-gray-800">유형</div>
            {type === 'POST' ? (
              <ReportTypeTag type="POST" />
            ) : (
              <ReportTypeTag type="REPLY" />
            )}
          </div>
          <div className="w-full flex items-center justify-start gap-x-20 text-14 text-gray-800">
            <div className="font-semibold">신고 대상 계정</div>
            <div className="font-normal grow">@{reporteeId}</div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center pt-20 pb-[25px] gap-x-20">
          <div
            className={`grow px-16 h-[40px] bg-white border border-gray-50 rounded-block ${isReasonOpen ? 'rounded-b-none' : ''} flex items-center justify-start gap-x-10 relative`}
          >
            <div
              className="w-full flex items-center justify-start cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onReasonClick();
              }}
            >
              <div className="grow font-medium text-gray-600">
                {!reason ? '신고 사유 선택' : reportReasonToKorean[reason]}
              </div>
              <Down
                className={`${
                  isReasonOpen ? 'transform rotate-180' : ''
                } transition-all duration-150`}
                width={24}
                height={24}
              />
            </div>
            <div
              className={`absolute left-0 top-[39px] w-full flex flex-col items-center justify-start py-8 px-16 gap-y-10 bg-white border border-t-0 border-gray-50 rounded-block rounded-t-none overflow-hidden transition-all duration-150
          ${isReasonOpen ? 'visible max-h-[500px]' : 'invisible max-h-0'}
          `}
            >
              <ReportProcessItem
                text={reportReasonToKorean['PROFANITY']}
                onClick={() => handleReasonType('PROFANITY')}
                isClicked={reason === 'PROFANITY'}
              />
              <ReportProcessItem
                text={reportReasonToKorean['HATE_SPEECH']}
                onClick={() => handleReasonType('HATE_SPEECH')}
                isClicked={reason === 'HATE_SPEECH'}
              />
              <ReportProcessItem
                text={reportReasonToKorean['SEXUAL_CONTENT']}
                onClick={() => handleReasonType('SEXUAL_CONTENT')}
                isClicked={reason === 'SEXUAL_CONTENT'}
              />
              <ReportProcessItem
                text={reportReasonToKorean['VIOLENCE']}
                onClick={() => handleReasonType('VIOLENCE')}
                isClicked={reason === 'VIOLENCE'}
              />
              <ReportProcessItem
                text={reportReasonToKorean['SPAM']}
                onClick={() => handleReasonType('SPAM')}
                isClicked={reason === 'SPAM'}
              />
              <ReportProcessItem
                text={reportReasonToKorean['HARMFUL_CONTENT']}
                onClick={() => handleReasonType('HARMFUL_CONTENT')}
                isClicked={reason === 'HARMFUL_CONTENT'}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-8">
            <RectButton
              text="취소"
              type="disable"
              w={'90px'}
              h={'40px'}
              fontSize={14}
              onClick={onCancelClick}
            />
            <RectButton
              text="처리"
              type="fill"
              w={'90px'}
              h={'40px'}
              fontSize={14}
              onClick={onReportClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportContainer;
