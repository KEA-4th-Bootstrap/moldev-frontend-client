import { getMoldevId } from '../../api/manageLocalStorage';
import useRouteNavigate from '../common/useRouteNavigate';

export const useSideButton = () => {
  const moldevId = getMoldevId();
  const { onClickIcon: goToMyIsland } = useRouteNavigate(`/${moldevId}`);
  const { onClickIcon: goToMain } = useRouteNavigate('/');

  return { goToMyIsland, goToMain };
};
