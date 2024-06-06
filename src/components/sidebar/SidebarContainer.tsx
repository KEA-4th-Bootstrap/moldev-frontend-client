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
import ListPage from '../../pages/sidebar/ListPage';
import { sideType } from '../../data/type';

const SidebarContainer = ({
  defaultSelected,
}: {
  defaultSelected: sideType;
}) => {
  const {
    clicked,
    setClicked,
    userInfoData,
    isLoginOpen,
    isLogoutOpen,
    isMyPageOpen,
    setIsLoginOpen,
    setIsLogoutOpen,
    setIsMyPageOpen,
  } = useSidebar(defaultSelected);

  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 w-1/3 shrink-0 h-screen flex items-start justify-start shadow-right bg-white">
        <SideButtonListContainer
          setClicked={setClicked}
          setIsLoginOpen={() => setIsLoginOpen(true)}
          setIsLogoutOpen={() => setIsLogoutOpen(true)}
          setIsMyPageOpen={() => setIsMyPageOpen(true)}
        />
        {clicked === 'onboarding' ? (
          <OnboardingPage />
        ) : clicked === 'list' ? (
          <ListPage userInfoData={userInfoData} />
        ) : clicked === 'search' ? (
          <SearchPage />
        ) : clicked === 'chatbot' ? (
          <ChatbotPage userInfoData={userInfoData} />
        ) : clicked === 'recommend' ? (
          <RecommendPage />
        ) : (
          <div>
            {clicked}
            {userInfoData?.moldevId}
          </div>
        )}
      </div>
      {isLoginOpen && <LoginPage closeHandler={() => setIsLoginOpen(false)} />}
      {isLogoutOpen && <LogoutPage />}
      {isMyPageOpen && <MyPage closeHandler={() => setIsMyPageOpen(false)} />}
    </>
  );
};

export default SidebarContainer;
