import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { PAGES_CONFIG } from "pages/pagesConfig";

export interface SidebarRoute {
  title: string;
  path?: string;
  icon?: IconDefinition;
  subRoutes?: SidebarRoute[];
}

export const routes: SidebarRoute[] = Object.values(PAGES_CONFIG).map((config) => ({
  title: config.routeName,
  path: config.path,
  icon: config.icon,
  subRoutes: config?.subRoutes?.map((subRoute) => ({ title: subRoute.title, path: subRoute.path })),
}));
