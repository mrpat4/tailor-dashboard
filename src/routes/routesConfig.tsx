import Admin from "pages/Admin";
import Login from "pages/Login/Login";
import { routeVariables } from "./routeVariables";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface RouteConfig {
  path: string;
  element: ReactElement;
  requiresAuth?: boolean;
  exact?: boolean;
}

export const routesConfig: RouteConfig[] = [
  { path: "/", element: <Navigate to={routeVariables.home} /> },
  { path: routeVariables.login, element: <Login /> },
  { path: routeVariables.dashboard.base, element: <div>dashboard</div>, requiresAuth: true },
  { path: routeVariables.admin.all, element: <Admin />, requiresAuth: true },
  // { path: "/users", element: <div>users</div>, requiresAuth: true },
  // { path: "/tasks", element: <div>tasks</div>, requiresAuth: true },
  // { path: "/shop/carts", element: <div>cart</div>, requiresAuth: true },
  // { path: "/shop/checkouts", element: <div>checkouts</div>, requiresAuth: true },
  // { path: "/shop/admins", element: <div>shop admins</div>, requiresAuth: true },
];
