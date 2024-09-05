import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "store/useAuthStore";
import { getInitials } from "utils/others";

const UserDropDown: FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const logOut = useAuthStore((state) => state.logout);
  const userEmail = useAuthStore((state) => state.userEmail);

  return (
    <div className="">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {/* <img
          src="/images/mathew.jpg"
          alt="user"
          className="w-10 rounded-50% border-2 border-primary"
        /> */}

        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white ">
          {userEmail ? getInitials(userEmail) : ""}
        </div>
      </div>
      {isOpen && (
        <div className="rounded-bl-md rounded-br-md w-fit absolute right-0 pt-5 pb-4 pr-2 bg-sidebar text-text">
          <div className="flex flex-col p-1 pl-3 pb-2">
            {/* <p className="text-sm">Mathew</p> */}
            <em className="text-xs">{userEmail || ""}</em>
          </div>
          <div className="p-1 pl-3 flex gap-3 cursor-pointer items-center" onClick={logOut}>
            <FontAwesomeIcon icon={faSignOut} />
            {t("signOut")}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropDown;
