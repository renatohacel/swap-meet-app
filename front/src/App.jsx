import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./modules/auth/context/AuthContext";

import LoginPage from "./modules/auth/components/LoginPage";
import Home from "./modules/dashboard/components/Home";

function App() {
  const { login } = useContext(AuthContext);
  return (
    <>
      <Routes>
        {login.isAuth ? (
          <Route path="/*" element={<Home />} />
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
