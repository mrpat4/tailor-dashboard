import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { truncateString } from "utils/others";
import useTailwindBreakpoints from "utils/useTailwindBreakPoints";

const Breadcrumbs: FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { isSm } = useTailwindBreakpoints();

  return (
    <div className=" md:block">
      <div className="flex items-center h-full">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb flex space-x-2">
            {pathnames.map((value, index) => {
              const isLast = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;
              if (isLast) {
                return (
                  <li
                    className="breadcrumb-item active capitalize text-xs"
                    aria-current="page"
                    key={to}
                  >
                    {truncateString(value.replace("_", " "))}
                  </li>
                );
              } else if (isLast || value === "edit") {
                return isSm ? (
                  ""
                ) : (
                  <li
                    className="breadcrumb-item active capitalize text-xs"
                    aria-current="page"
                    key={to}
                  >
                    {value.replace("_", " ")} /
                  </li>
                );
              } else {
                return (
                  <li className="breadcrumb-item capitalize text-xs" key={to}>
                    <Link to={to} className="text-primary hover:underline mr-2">
                      {value.replace("_", " ")}
                    </Link>
                    /
                  </li>
                );
              }
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
