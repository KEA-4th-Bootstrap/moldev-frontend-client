import React from 'react';
import { sideType } from '../../data/type';
import { ReactComponent as Person } from '../../assets/icons/icon_person.svg';
import { ReactComponent as List } from '../../assets/icons/icon_list.svg';
import { ReactComponent as Search } from '../../assets/icons/icon_search.svg';
import { ReactComponent as Chatbot } from '../../assets/icons/icon_robot.svg';
import { ReactComponent as Recommend } from '../../assets/icons/icon_user_search.svg';
import { ReactComponent as Login } from '../../assets/icons/icon_login.svg';
import { ReactComponent as Logout } from '../../assets/icons/icon_logout.svg';
import { ReactComponent as Onboarding } from '../../assets/icons/icon_question.svg';
import useAuthStore from '../../store/useAuthStore';

const SideButtonListContainer = ({
  isLogin,
  setClicked,
  setIsLoginOpen,
  // setIsLogoutOpen,
  setIsMyPageOpen,
}: {
  isLogin: boolean;
  setClicked: (clicked: sideType) => void;
  setIsLoginOpen: () => void;
  setIsLogoutOpen: () => void;
  setIsMyPageOpen: () => void;
}) => {
  const { logout } = useAuthStore();
  return (
    <div className="shrink-0 h-full px-16 py-30 flex flex-col justify-between items-center shadow-right z-10">
      <div className="flex flex-col justify-start items-center gap-y-24">
        {isLogin ? (
          <>
            <Person
              className="cursor-pointer hover:scale-110"
              width={28}
              height={28}
              onClick={setIsMyPageOpen}
            />
            <List
              className="cursor-pointer hover:scale-110"
              width={28}
              height={28}
              onClick={() => setClicked('list')}
            />
            <Search
              className="cursor-pointer hover:scale-110"
              width={28}
              height={28}
              onClick={() => setClicked('search')}
            />
            <Chatbot
              className="cursor-pointer hover:scale-110"
              width={28}
              height={28}
              onClick={() => setClicked('chatbot')}
            />
            <Recommend
              className="cursor-pointer hover:scale-110"
              width={28}
              height={28}
              onClick={() => setClicked('recommend')}
            />
          </>
        ) : (
          <>
            <Login
              className="cursor-pointer hover:scale-110"
              width={28}
              height={28}
              onClick={setIsLoginOpen}
            />
            <Search
              className="cursor-pointer hover:scale-110"
              width={28}
              height={28}
              onClick={() => setClicked('search')}
            />
            <Chatbot
              className="hover:scale-110 blur-sm"
              width={28}
              height={28}
            />
            <Recommend
              className="hover:scale-110 blur-sm"
              width={28}
              height={28}
            />
          </>
        )}
      </div>
      {isLogin ? (
        <Logout
          className="cursor-pointer hover:scale-110"
          width={28}
          height={28}
          onClick={logout}
        />
      ) : (
        <Onboarding
          className="cursor-pointer hover:scale-110"
          width={28}
          height={28}
          onClick={() => setClicked('onboarding')}
        />
      )}
    </div>
  );
};

export default SideButtonListContainer;
