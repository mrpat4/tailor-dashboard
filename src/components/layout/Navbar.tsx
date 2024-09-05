import useSidebarStore from "store/useSidebarStore";
import Breadcrumbs from "../BreadCrubs";
import ChangeLanguage from "./ChangeLanguageDD";
import UserDropDown from "./UserDD";
import { FC } from "react";

const Navbar: FC = () => {
  const { isOpen } = useSidebarStore();

  return (
    <>
      <nav className="w-full flex justify-end items-center bg-sidebar p-3 md:pr-12 gap-4 relative">
        <div
          className={`${isOpen ? "md:ml-[17rem] ml-8" : "md:ml-[5rem] ml-8"} mr-auto transition300`}
        >
          <Breadcrumbs />
        </div>
        <ChangeLanguage />
        <UserDropDown />
      </nav>
    </>
  );
};

export default Navbar;
