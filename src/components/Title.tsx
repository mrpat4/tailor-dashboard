import { FC } from "react";
import Button from "./Button";

interface Title {
  title: string;
  hasBtn: boolean;
  url: string;
  btnTitle: string;
}
const Title: FC<Title> = ({ title, hasBtn, url, btnTitle }) => {
  return (
    <div className="flex justify-between md:items-center mb-4 md:flex-row flex-col items-start gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      {hasBtn && (
        <Button variant="primary" to={url}>
          {btnTitle}
        </Button>
      )}
    </div>
  );
};

export default Title;
