import { useEffect, useState } from 'react';

const useJoinRule = () => {
  const [isTotalSelected, setIsTotalSelected] = useState(false);
  const [isServiceSelected, setIsServiceSelected] = useState(false);
  const [isPersonalSelected, setIsPersonalSelected] = useState(false);
  const [isThirdSelected, setIsThirdSelected] = useState(false);
  const [isMarketingSelected, setIsMarketingSelected] = useState(false);
  const [isStepType, setIsStepType] = useState(false);

  useEffect(() => {
    if (
      isServiceSelected &&
      isPersonalSelected &&
      isThirdSelected &&
      isMarketingSelected
    ) {
      setIsTotalSelected(true);
    } else {
      setIsTotalSelected(false);
    }
  }, [
    isServiceSelected,
    isPersonalSelected,
    isThirdSelected,
    isMarketingSelected,
  ]);

  const onClickTotal = () => {
    if (isTotalSelected) {
      setIsTotalSelected(false);
      setIsServiceSelected(false);
      setIsPersonalSelected(false);
      setIsThirdSelected(false);
      setIsMarketingSelected(false);
    } else {
      setIsTotalSelected(true);
      setIsServiceSelected(true);
      setIsPersonalSelected(true);
      setIsThirdSelected(true);
      setIsMarketingSelected(true);
    }
  };

  return {
    isTotalSelected,
    isServiceSelected,
    isPersonalSelected,
    isThirdSelected,
    isMarketingSelected,
    isStepType,
    setIsServiceSelected,
    setIsPersonalSelected,
    setIsThirdSelected,
    setIsMarketingSelected,
    setIsStepType,
    onClickTotal,
  };
};

export default useJoinRule;
