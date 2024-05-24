import { ReactComponent as Loading } from '../../assets/icons/icon_loading.svg';
const LoadingSpinner = () => {
  return (
    <div className="animate-spin w-full h-[300px] flex items-center justify-center">
      <Loading width={100} height={100} />
    </div>
  );
};

export default LoadingSpinner;
