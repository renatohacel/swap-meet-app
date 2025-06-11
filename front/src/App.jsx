import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./modules/auth/context/AuthContext";
import { CONSTANTS_ROUTES } from './utils/constansRoutes'

import LoginPage from "./modules/auth/components/LoginPage";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
  const { login } = useContext(AuthContext);
  return (
    <Routes>
      {login.isAuth ? (
        <Route path="/*" element={<DashboardRoutes />} />
      ) : (
        <>
          <Route path={CONSTANTS_ROUTES.AUTH.LOGIN} element={<LoginPage />} />
          <Route path="/*" element={<Navigate to={CONSTANTS_ROUTES.AUTH.LOGIN} />} />
        </>
      )}
    </Routes>
  );
}

export default App;
