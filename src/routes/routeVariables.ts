// import { ADMIN_CONFIGS } from "pages/Admin/configs";

import { Routes } from "configs/globalInterfaces";
import { PAGES_CONFIG } from "pages/pagesConfig";
interface RouteVariables {
  home: string;
  login: string;
  verify: string;
  file: {
    base: string;
    list: string;
    add: string;
    edit: string;
  };
  [key: string]: Routes | any;
}

export const routeVariables: RouteVariables = {
  home: `/dashboard`,
  login: `/login`,
  verify: `/verify`,
  file: {
    base: `/file`,
    list: `/file/list`,
    add: `/file/add`,
    edit: `/file/edit`,
  },
  ...Object.keys(PAGES_CONFIG).reduce((acc, key) => {
    acc[key] = PAGES_CONFIG[key].routes;
    return acc;
  }, {} as Record<string, any>),
};
