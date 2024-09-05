import { PAGES_CONFIG } from "pages/pagesConfig";
import environment from "./baseUrl.json";

type PageConfigKeys = keyof typeof PAGES_CONFIG;

interface ApiEndpoints {
  host: string;
  login: string;
  refreshToken: string;
  verify: string;
  network: string;
  dashboard: string;
  files: string;
  [key: string]: any;
}

interface ApiResource {
  base: string;
  list: string;
  get: string;
  delete: string;
  getBySlug: string;
  getSingle: string;
  changeStatus: string;
}

const generateApiResources = (path: string): ApiResource => ({
  base: `/${path}`,
  list: `/${path}/list`,
  get: `/${path}/get`,
  delete: `/${path}/delete`,
  getBySlug: `/${path}/getBySlug`,
  getSingle: `/${path}/getSingle`,
  changeStatus: `/${path}/changeStatus`,
});

const apiEndpoints: ApiEndpoints = {
  host: environment.BASE_URL,
  login: "/auth/login",
  refreshToken: "/auth/refresh",
  verify: "/auth/verify-login",
  network: "/network",
  dashboard: "/admin/dashboard",
  files: "/admin/files",
  servingUnit: "/admin/serving-unit",
};

(Object.keys(PAGES_CONFIG) as Array<PageConfigKeys>).forEach((key) => {
  const config = PAGES_CONFIG[key];
  apiEndpoints[key] = generateApiResources(config.apiName);
});

export default apiEndpoints;
