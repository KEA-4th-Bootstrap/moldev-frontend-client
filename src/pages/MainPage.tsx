import { Outlet } from 'react-router-dom';
import MainContainer from '../components/mainPage/MainContainer';
import SidebarContainer from '../components/sidebar/SidebarContainer';

const MainPage = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-end">
      <SidebarContainer />
      <MainContainer />
      <Outlet />
    </div>
  );
};

export default MainPage;
