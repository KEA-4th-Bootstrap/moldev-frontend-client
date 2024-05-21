const LineHeaderItemContainer = ({
  text,
  isClicked,
  onClick,
}: {
  text: string;
  isClicked: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-x-10 px-16 py-11 text-20 border-b-2 cursor-pointer ${isClicked ? 'font-bold border-main' : 'text-gray-400 border-transparent'}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default LineHeaderItemContainer;
