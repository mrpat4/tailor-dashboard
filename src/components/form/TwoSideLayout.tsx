import { FC, ReactNode } from "react";

interface TwoSideLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

const TwoSideLayout: FC<TwoSideLayoutProps> = ({ left, right }) => {
  return (
    <div className="flex flex-wrap justify-between gap-2">
      <div className="w-full lg:w-[49%] flex flex-col ">{left}</div>
      <div
        className="w-full lg:w-[49%] flex flex-col +
      "
      >
        {right}
      </div>
    </div>
  );
};

export default TwoSideLayout;
