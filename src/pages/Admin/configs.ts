import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { PageConfigs } from "configs/globalInterfaces";

const name = "admin";

export const CONFIGS: PageConfigs = {
  title: name,
  path: `/${name}`,
  icon: faUserShield,
  apiName: name,
  routeName: name,
  componentNames: [name, `${name}s`],
  // subRoutes: [
  //   { title: "first", path: "/user/first" },
  //   { title: "second", path: "/user/second" },
  // ],
  routes: {
    all: `/${name}/*`,
    base: `/${name}`,
    list: "/list",
    add: `/add`,
    edit: `/edit/:id`,
  },
};
