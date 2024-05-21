import { useNavigate } from 'react-router';

const useRouteNavigate = (url: string) => {
  const navigate = useNavigate();

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(url);
  };

  const onClickIcon = () => {
    navigate(url);
  };

  return { onClick, onClickIcon };
};

export default useRouteNavigate;
