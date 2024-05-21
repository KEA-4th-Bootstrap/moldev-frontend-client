import { ReactComponent as Info } from '../../assets/icons/icon_info_main.svg';
import OnboardingListItem from '../../components/sidebar/onboarding/OnboardingListItem';

const OnboardingPage = () => {
  return (
    <div className="grow h-full flex flex-col items-start justify-start px-16">
      <div className="w-full mt-70 text-28">
        <div className="font-bold">몰데브</div>
        <div className="font-medium">사용설명서</div>
      </div>
      <div className="w-full text-gray-800 mt-18">
        몰데브는 <span className="font-semibold text-dark-300">프로젝트</span>가
        진행 중이거나 종료된 후,
        <br />
        자신의 경험을 좀 재미있고 간편하게{' '}
        <span className="font-semibold text-dark-300">문서화</span> 할 수 있도록
        <br />
        돕는{' '}
        <span className="font-semibold text-dark-300">미니홈피 블로그</span>
        입니다.
      </div>
      <div className="w-full p-10 rounded-lg bg-info flex items-start justify-start gap-x-8 mt-30">
        <Info width={18} height={18} />
        <div className="text-14 text-gray-800">
          나의 섬을 꾸미며 블로그를 관리하도록 유도하여,
          <br />
          지치지 않고 꾸준한 글 작성이 가능하도록 돕습니다.
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-start border-t-[0.5px] border-gray-100 mt-45">
        <OnboardingListItem
          url="/img/img_island.png"
          title="나의 블로그, 나의 섬"
          text={`나의 블로그를 섬 형태로 확인할 수 있어요. 섬 위의 각 아이템을 클릭하면 카테고리별로 작성한 글 목록을 확인할 수 있어요.`}
        />
        <OnboardingListItem
          url="/img/img_folder.png"
          title="중복을 줄인 효과적인 분류"
          text={`미리 작성해 둔 프로젝트, 트러블슈팅 카테고리의 글을 다른 글 작성 시 임베딩할 수 있어요.
          중복되는 내용이 작성되는 경우를 방지하여 효과적인 블로그 관리가 가능해요.`}
        />
        <OnboardingListItem
          url="/img/img_chat.png"
          title="하나의 섬에 특화된 검색"
          text={`일반적인 블로그 전체 검색과 더불어, 한 유저의 섬에 특화된 검색을 할 수 있는 챗봇이 함께합니다.
          특정 유저의 주요 스택, 메인 프로젝트 등 궁금한 점을 물어보세요.`}
        />
        <OnboardingListItem
          url="/img/img_bookmark.png"
          title="나와 어울리는 섬 추천"
          text={`작성한 글을 바탕으로 내가 가진 기술, 진행한 프로젝트 등을 분석하여 나와 어울리는 섬을 추천받을 수 있습니다.
          나와 유사한 섬을 방문하여 인사이트를 얻어보세요.`}
        />
      </div>
    </div>
  );
};

export default OnboardingPage;
