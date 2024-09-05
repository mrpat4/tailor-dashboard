import { Navigate, Route, Routes } from "react-router-dom";
import { CONFIGS } from "./configs";
import Add from "./Add";
import List from "./List";

const Admin = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={CONFIGS.routes.base + CONFIGS.routes.list} />} />
      <Route path={CONFIGS.routes.list} element={<List />} />
      <Route path={CONFIGS.routes.add} element={<Add />} />
      <Route path={CONFIGS.routes.edit} element={<Add />} />
    </Routes>
  );
};

export default Admin;
