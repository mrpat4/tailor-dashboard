import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useRef } from "react";
import useSidebarStore from "store/useSidebarStore";
import { useThemeStore } from "store/useThemeStore";

const ThemeToggle: FC = () => {
  const { isOpen } = useSidebarStore();
  const { theme, toggleTheme } = useThemeStore();
  console.log("🚀 ~ theme:", theme);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      theme === "dark"
        ? inputRef.current.setAttribute("checked", "checked")
        : inputRef.current.removeAttribute("checked");
    }
  }, [theme]);

  return (
    <>
      {isOpen ? (
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" ref={inputRef} onChange={toggleTheme} className="sr-only peer" />
          <div className="w-20 h-7 bg-gray-100 rounded-full peer dark:bg-lightDark peer-checked:dark:bg-lightDark flex items-center justify-between p-1 parent-animation-on-hover">
            <FontAwesomeIcon
              icon={faLightbulb}
              className={`w-4 pl-1 text-primary swing-on-hover`}
            />
            <FontAwesomeIcon icon={faMoon} className={`w-4 pr-1 text-primary swing-on-hover`} />
            <div
              className={`absolute top-[2px] left-0.5 w-6 h-6 bg-primary rounded-full shadow-md transform transition-transform ${
                theme === "dark" ? "translate-x-[52px]" : ""
              }`}
            ></div>
          </div>
        </label>
      ) : (
        <div className="flex items-center cursor-pointer parent-animation-on-hover">
          {theme === "dark" ? (
            <FontAwesomeIcon
              icon={faLightbulb}
              className={`w-4 pl-1 text-primary swing-on-hover`}
              onClick={toggleTheme}
            />
          ) : (
            <FontAwesomeIcon
              icon={faMoon}
              className={`w-4 pr-1 text-primary swing-on-hover`}
              onClick={toggleTheme}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ThemeToggle;
