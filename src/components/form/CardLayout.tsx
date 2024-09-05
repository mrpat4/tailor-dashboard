import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface CardLayoutProps {
  head?: {
    title?: string;
    side?: ReactNode;
  };
  children: ReactNode;
  className?: string;
}

const CardLayout: FC<CardLayoutProps> = ({ head, children, className }) => {
  const { t } = useTranslation();

  return (
    <div className={`rounded-lg bg-sidebar ${className}`}>
      <div className="flex justify-between p-3 items-center">
        <div>
          <h4 className="text-lg font-semibold text-text">
            {head?.title ? t(head?.title) : t("basicInformation")}
          </h4>
        </div>
        <div className="flex justify-end">{head?.side}</div>
      </div>

      <div className="p-4">{children}</div>
    </div>
  );
};

export default CardLayout;
