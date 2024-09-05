import React, { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useTailwindBreakpoints from "utils/useTailwindBreakPoints";

type Language = {
  name: string;
  flag: string;
  code: string;
};

const languages: Record<string, Language> = {
  en: { name: "English", flag: "/images/english.png", code: "EN" },
  tr: { name: "Türkçe", flag: "/images/turkish.png", code: "TR" },
};

const ChangeLanguage: FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const { isMd } = useTailwindBreakpoints();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setCurrentLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem("language", lng);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        {isMd ? (
          <button
            type="button"
            className="parent-animation-on-hover inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-text rounded-md hover:bg-mainSection transition300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {languages[currentLanguage].code}
            <FontAwesomeIcon icon={faChevronDown} className="w-3 h-5 ml-2 -mr-1 shake-on-hover" />
          </button>
        ) : (
          <button
            type="button"
            className="parent-animation-on-hover inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-text rounded-md hover:bg-mainSection transition300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={languages[currentLanguage]?.flag}
              alt={languages[currentLanguage].name}
              className="w-4 rounded-50% mr-2"
            />
            {languages[currentLanguage].name}
            <FontAwesomeIcon icon={faChevronDown} className="w-3 h-5 ml-2 -mr-1 shake-on-hover" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 origin-top-right bg-mainSection text-text rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div>
            {Object.keys(languages).map((lng) => (
              <button
                key={lng}
                onClick={() => changeLanguage(lng)}
                className={`transition300 rounded-md w-full flex items-center justify-center gap-2 px-4 py-1 mb-1 text-sm hover:bg-hoverPrimary ${
                  currentLanguage === lng ? "bg-primary" : ""
                }`}
              >
                <img
                  src={languages[lng].flag}
                  alt={languages[lng].name}
                  className="w-4 rounded-50% md:mr-2 mr-1"
                />
                {isMd ? languages[lng].code : languages[lng].name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeLanguage;
