import { FC } from "react";

interface LoadingProps {
  size: string;
}

const Loading: FC<LoadingProps> = ({ size }) => {
  return (
    <div className={`flex items-center justify-center ${size}`}>
      <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
