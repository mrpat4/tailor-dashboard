import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isFullSize?: boolean;
  color?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  isFullSize,
  color = "inputBg",
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative flex justify-between items-center">
      <input
        type="text"
        placeholder={t("search")}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`px-3 py-2 border rounded-md bg-${color} border-${color} text-mute outline-none focus:border-primary focus:dark:border-primary
          ${isFullSize && "w-full"}
          `}
      />
      {searchTerm && (
        <div className="cursor-pointer absolute right-3 text-xs" onClick={() => onSearchChange("")}>
          <FontAwesomeIcon icon={faClose} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
