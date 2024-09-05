import { faBars, faChevronDown, faChevronLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { routes, SidebarRoute } from "configs/SidebarConfig";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import useSidebarStore from "store/useSidebarStore";
import { useThemeStore } from "store/useThemeStore";
import useTailwindBreakpoints from "utils/useTailwindBreakPoints";
import ThemeToggle from "./ThemeToggle";

const Sidebar: FC = () => {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebarStore();
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const currentRoute = useLocation();
  const { isMd } = useTailwindBreakpoints();

  const parentPath = currentRoute.pathname.split("/").slice(0, 2).join("/");

  const handleDropdownClick = (route: SidebarRoute) => {
    setOpenDropdown(openDropdown === route.title ? null : route.title);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        closeSidebar();
      }
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  const renderRoutes = (routes: SidebarRoute[]) => {
    return routes.map((route, index) => (
      <li key={index} className="mb-2">
        {route.path ? (
          <NavLink
            to={route.path}
            onClick={isMd ? toggleSidebar : () => false}
            className={({ isActive }) =>
              `${
                isActive ? "text-primary flex items-center active" : "text-text flex items-center"
              } hover:text-hoverPrimary transition300 parent-animation-on-hover`
            }
          >
            {route.icon && <FontAwesomeIcon icon={route.icon} className="mr-2 shake-on-hover" />}
            <span className={`ml-2 ${isOpen ? "block" : "hidden"}`}>{t(route.title)}</span>
          </NavLink>
        ) : (
          <>
            <div
              className={`${
                parentPath === "/" + route.title.toLowerCase() ? "text-primary" : "text-text"
              } flex items-center cursor-pointer hover:text-hoverPrimary transition300`}
              onClick={() => handleDropdownClick(route)}
            >
              {route.icon && <FontAwesomeIcon icon={route.icon} className="mr-2 shake-on-hover" />}
              <span className={`ml-2 mr-auto ${isOpen ? "block" : "hidden"}`}>
                {t(route.title)}
              </span>
              {isOpen && (
                <FontAwesomeIcon
                  icon={
                    openDropdown === route.title || parentPath === "/" + route.title.toLowerCase()
                      ? faChevronLeft
                      : faChevronDown
                  }
                  size="xs"
                />
              )}
            </div>
            {route.subRoutes && (
              <ul
                className={`ml-9 mt-2 ${
                  openDropdown === route.title || parentPath === "/" + route.title.toLowerCase()
                    ? "block"
                    : "hidden"
                }`}
              >
                {renderRoutes(route.subRoutes)}
              </ul>
            )}
          </>
        )}
      </li>
    ));
  };

  return (
    <>
      <div
        className={`fixed -top-3 left-0 md:bg-sidebar p-4 transition-all duration-300 z-50 ${
          isOpen ? "md:w-64 w-fit" : "w-fit"
        }`}
      >
        <div className={`flex justify-between items-center mt-4`}>
          {isOpen && (
            <img
              className={`md:w-20 hidden md:block object-contain`}
              src={`${theme === "dark" ? "/images/logo.png" : "/images/logo-black.png"}`}
            />
          )}
          <button
            onClick={toggleSidebar}
            className={`text-text mb-4 absolute top-8 ${isOpen ? "md:right-4" : "md:left-4"}`}
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
      <div
        className={`fixed top-[3.7rem] left-0 h-heightMobileSidebar bg-sidebar p-4 transition-all duration-300 z-50 ${
          isOpen
            ? "md:w-64 w-[50%} translate-x-0"
            : "md:w-16 md:translate-x-0 w-0 -translate-x-[200%]"
        }`}
      >
        <nav className={`flex flex-col items-start mt-5`}>
          <ul className="flex flex-col gap-4 w-full">{renderRoutes(routes)}</ul>
        </nav>
        <div className={`${isOpen ? "md:left-20 left-7" : "left-[15px]"} fixed bottom-8 z-50`}>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
