import { PageConfigs } from "configs/globalInterfaces";
import { CONFIGS as ADMIN_CONFIGS } from "./Admin/configs";
import { CONFIGS as DASHBOARD_CONFIGS } from "./Dashboard/configs";

interface PagesConfig {
  [key: string]: PageConfigs;
}

export const PAGES_CONFIG: PagesConfig = {
  dashboard: DASHBOARD_CONFIGS,
  admin: ADMIN_CONFIGS,
};
