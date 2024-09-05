import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Routes {
  all: string;
  base: string;
  list: string;
  add: string;
  edit: string;
}

export interface PageConfigs {
  title: string;
  path?: string;
  icon: IconDefinition;
  apiName: string;
  subRoutes?: { title: string; path: string }[];
  routeName: string;
  componentNames: [string, string];
  routes: Routes;
}
