import { FC, ReactNode } from "react";

interface FormLayoutProps {
  main: ReactNode;
  side: ReactNode;
}

const FormLayout: FC<FormLayoutProps> = ({ main, side }) => {
  return (
    <div className="flex flex-wrap justify-between gap-1">
      <div className="w-full lg:w-[74%] flex flex-col ">{main}</div>
      <div className="w-full lg:w-[25%] flex flex-col  sticky top-0">{side}</div>
    </div>
  );
};

export default FormLayout;
