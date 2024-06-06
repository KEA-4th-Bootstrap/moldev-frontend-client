import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useMoldevPage = () => {
  const [showTravel, setShowTravel] = useState(false);

  const location = useLocation();
  const nickname = location.state?.nickname ?? '';
  const islandName = location.state?.islandName ?? '';

  useEffect(() => {
    console.log(nickname, islandName);

    if (!!nickname && !!islandName) {
      setShowTravel(true);
    }

    const timer = setTimeout(() => {
      setShowTravel(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [nickname, islandName]);

  return { showTravel, nickname, islandName };
};
