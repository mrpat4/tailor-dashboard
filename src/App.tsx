import Layout from "components/layout/Layout";
import Login from "pages/Login/Login";
import { FC } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppRoutes from "routes/AppRoutes";
import "./index.css";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="*"
          element={
            <Layout>
              <AppRoutes />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
