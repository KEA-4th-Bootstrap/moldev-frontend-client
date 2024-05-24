import { Outlet } from 'react-router-dom';
import MainContainer from '../components/mainPage/MainContainer';
import SidebarContainer from '../components/sidebar/SidebarContainer';
import useAuthStore from '../store/useAuthStore';
import { useEffect } from 'react';

const MainPage = () => {
  const { isLoggedIn } = useAuthStore();
  useEffect(() => {
    console.log('isLoggedIn : ', isLoggedIn);
  }, [isLoggedIn]);
  return (
    <div className="flex w-full min-h-screen items-center justify-end">
      <SidebarContainer />
      <MainContainer />
      <Outlet />
    </div>
  );
};

export default MainPage;
