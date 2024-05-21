import { ReactComponent as Selected } from '../../assets/icons/icon_selected.svg';
import { ReactComponent as Unselected } from '../../assets/icons/icon_unselected.svg';

const JoinRuleItemContainer = ({
  text,
  isSelected,
  onClick,
  isBold,
}: {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  isBold: boolean;
}) => {
  return (
    <div className="w-full flex items-center justify-start gap-x-25">
      <div className="h-[25px] w-[25px] cursor-pointer" onClick={onClick}>
        {isSelected ? (
          <Selected className="w-full h-full" />
        ) : (
          <Unselected className="w-full h-full" />
        )}
      </div>
      <div
        className={`grow text-24 ${isBold ? 'font-semibold' : 'font-normal'}`}
      >
        {text}
      </div>
    </div>
  );
};

export default JoinRuleItemContainer;
