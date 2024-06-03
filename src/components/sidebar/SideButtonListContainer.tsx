/** @jsxImportSource @emotion/react */
import { sideType } from '../../data/type';
import { ReactComponent as Person } from '../../assets/icons/icon_person.svg';
import { ReactComponent as Logo } from '../../assets/logo/logo_tree.svg';
import { ReactComponent as List } from '../../assets/icons/icon_list.svg';
import { ReactComponent as Search } from '../../assets/icons/icon_search.svg';
import { ReactComponent as Chatbot } from '../../assets/icons/icon_robot.svg';
import { ReactComponent as Recommend } from '../../assets/icons/icon_user_search.svg';
import { ReactComponent as Login } from '../../assets/icons/icon_login.svg';
import { ReactComponent as Logout } from '../../assets/icons/icon_logout.svg';
import { ReactComponent as Onboarding } from '../../assets/icons/icon_question.svg';
import useAuthStore from '../../store/useAuthStore';
import { useSideButton } from '../../hooks/sidebar/useSideButton';

const SideButtonListContainer = ({
  setClicked,
  setIsLoginOpen,
  // setIsLogoutOpen,
  setIsMyPageOpen,
}: {
  setClicked: (clicked: sideType) => void;
  setIsLoginOpen: () => void;
  setIsLogoutOpen: () => void;
  setIsMyPageOpen: () => void;
}) => {
  const { isLoggedIn, logout } = useAuthStore();
  const { goToMyIsland, goToMain } = useSideButton();
  return (
    <div className="shrink-0 h-full px-16 py-30 flex flex-col justify-between items-center shadow-right z-10">
      <div className="flex flex-col justify-start items-center gap-y-24">
        <Logo
          className="cursor-pointer hover:scale-110"
          width={28}
          height={28}
          onClick={goToMain}
        />
        {isLoggedIn ? (
          <div className="sidebar-button flex items-center justify-start gap-x-10 relative">
            <Person
              className="sidebar-button-icon cursor-pointer hover:scale-110"
              width={28}
              height={28}
            />
            <div className="box-border sidebar-button-text shrink-0 overflow-hidden rounded-block absolute w-[130px] h-[70px] bg-dark-300/80 left-[38px] top-0 bottom-0 flex flex-col items-start justify-between py-8 text-white">
              <div
                className="shrink-0 w-[130px] hover:underline underline-offset-4 cursor-pointer px-16"
                onClick={goToMyIsland}
              >
                내 섬 방문하기
              </div>
              <div
                className="shrink-0 w-[130px] hover:underline underline-offset-4 cursor-pointer px-16"
                onClick={setIsMyPageOpen}
              >
                계정 설정
              </div>
            </div>
          </div>
        ) : (
          <Login
            className="cursor-pointer hover:scale-110"
            width={28}
            height={28}
            onClick={setIsLoginOpen}
          />
        )}
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
          className={`cursor-pointer hover:scale-110 ${!isLoggedIn && 'blur-sm'}`}
          width={28}
          height={28}
          onClick={isLoggedIn ? () => setClicked('chatbot') : () => {}}
        />
        <Recommend
          className={`cursor-pointer hover:scale-110 ${!isLoggedIn && 'blur-sm'}`}
          width={28}
          height={28}
          onClick={isLoggedIn ? () => setClicked('recommend') : () => {}}
        />
      </div>
      {isLoggedIn ? (
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
