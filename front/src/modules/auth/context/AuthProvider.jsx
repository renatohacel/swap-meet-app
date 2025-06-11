import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const { login, handleLogin, handleLogout } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        login,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
