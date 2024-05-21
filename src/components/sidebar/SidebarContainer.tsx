import React from 'react';
import useSidebar from '../../hooks/sidebar/useSidebar';
import SideButtonListContainer from './SideButtonListContainer';
import OnboardingPage from '../../pages/sidebar/OnboardingPage';
import SearchPage from '../../pages/sidebar/SearchPage';
import ChatbotPage from '../../pages/sidebar/ChatbotPage';
import RecommendPage from '../../pages/sidebar/RecommendPage';
import LoginPage from '../../pages/LoginPage';
import LogoutPage from '../../pages/LogoutPage';
import MyPage from '../../pages/MyPage';

const SidebarContainer = () => {
  const {
    isLogin,
    clicked,
    setClicked,
    memberName,
    islandNamd,
    isLoginOpen,
    isLogoutOpen,
    isMyPageOpen,
    setIsLoginOpen,
    setIsLogoutOpen,
    setIsMyPageOpen,
  } = useSidebar();

  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 w-1/3 shrink-0 h-screen flex items-start justify-start shadow-right bg-white">
        <SideButtonListContainer
          isLogin={isLogin}
          setClicked={setClicked}
          setIsLoginOpen={() => setIsLoginOpen(true)}
          setIsLogoutOpen={() => setIsLogoutOpen(true)}
          setIsMyPageOpen={() => setIsMyPageOpen(true)}
        />
        {clicked === 'onboarding' ? (
          <OnboardingPage />
        ) : clicked === 'search' ? (
          <SearchPage />
        ) : clicked === 'chatbot' ? (
          <ChatbotPage />
        ) : clicked === 'recommend' ? (
          <RecommendPage />
        ) : (
          <div>
            {clicked}
            {memberName}
            {islandNamd}
          </div>
        )}
      </div>
      {isLoginOpen && <LoginPage closeHandler={() => setIsLoginOpen(false)} />}
      {isLogoutOpen && <LogoutPage />}
      {isMyPageOpen && <MyPage />}
    </>
  );
};

export default SidebarContainer;
