import PrivateRoute from "components/PrivateRoute";
import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routesConfig } from "./routesConfig";
import { routeVariables } from "./routeVariables";

const AppRoutes: FC = () => {
  return (
    <Routes>
      {routesConfig.map((route) => {
        if (route.requiresAuth) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<PrivateRoute element={route.element} />}
            />
          );
        }
        return <Route key={route.path} path={route.path} element={route.element} />;
      })}
      <Route path="*" element={<Navigate to={routeVariables.home} />} />
    </Routes>
  );
};

export default AppRoutes;
