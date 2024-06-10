import { useState } from 'react';
import { reportItemType, reportReasonType, reportType } from '../../data/type';
import { useMutation } from 'react-query';
import { postReport } from '../../api/memberApi';

export const useReport = (
  type: reportType,
  contentId: string | number,
  reporterId: string,
  reporteeId: string,
  onClose: () => void,
) => {
  const [isReasonOpen, setIsReasonOpen] = useState(false);
  const [reason, setReason] = useState<reportReasonType | null>(null);

  const { mutate: tryReport } = useMutation(
    (data: reportItemType) => postReport(type, data),
    {
      onSuccess: (data) => {
        console.log('신고 접수 완료 --> ', data);
        onClose();
      },
      onError: (error) => {
        console.log('신고 접수 실패 --> ', error);
      },
    },
  );

  const onReasonClick = () => {
    setIsReasonOpen(!isReasonOpen);
  };

  const handleReasonType = (type: reportReasonType) => {
    setReason(type);
    setIsReasonOpen(false);
  };

  const onReportClick = () => {
    if (!reason) {
      alert('신고 사유를 선택해주세요.');
      return;
    }

    tryReport({
      reportRequestDto: {
        reporterId: reporterId,
        reporteeId,
        reason,
      },
      contentId,
    });
  };

  const onCancelClick = () => {
    onClose();
  };

  return {
    isReasonOpen,
    reason,
    onReasonClick,
    handleReasonType,
    onReportClick,
    onCancelClick,
  };
};
