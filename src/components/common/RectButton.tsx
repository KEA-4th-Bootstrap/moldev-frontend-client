/** @jsxImportSource @emotion/react */
import { Common } from '../../styles/Common';
import { buttonType } from '../../data/type';
import tw from 'twin.macro';

const RectButton = ({
  type,
  text,
  isAble = true,
  onClick,
  fontSize = 18,
  w,
  h,
  isSubmit = false,
}: {
  type: buttonType;
  text: string;
  isAble?: boolean;
  onClick: () => void;
  fontSize?: number;
  h?: string;
  w?: string;
  isSubmit?: boolean;
}) => {
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      css={[
        tw`rounded-rectButton px-32 py-16 font-medium`,
        {
          color: type === 'stroke' ? Common.color.main : Common.color.white,
          backgroundColor: !isAble
            ? Common.color.disable
            : type === 'fill'
              ? Common.color.main
              : type === 'stroke'
                ? Common.color.white
                : type === 'disable'
                  ? Common.color.disable
                  : Common.color.gray[100],
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor:
            type === 'stroke' ? Common.color.main : Common.color.transparent,
          height: h ? `${h}` : 'auto',
          width: w ? `${w}` : 'auto',
          fontSize: `${fontSize}px`,
          cursor:
            type === 'disable' || type === 'incomplete'
              ? 'not-allowed'
              : 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      disabled={!isAble}
      onClick={
        isSubmit
          ? undefined
          : isAble
            ? (e) => {
                e.preventDefault();
                onClick();
              }
            : () => {}
      }
    >
      <div className="shrink-0 overflow-visible">{text}</div>
    </button>
  );
};

export default RectButton;
