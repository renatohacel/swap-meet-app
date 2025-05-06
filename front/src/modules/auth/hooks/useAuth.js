import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { CONSTANTS } from "../../../utils/constans";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  token: undefined,
};

export const useAuth = () => {
  const [login, dispatch] = useReducer(authReducer, initialLogin);
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    try {
      const { token } = await loginUser({ username, password });
      dispatch({
        type: CONSTANTS.LOGIN,
        payload: token,
      });
      sessionStorage.setItem(
        "login",
        JSON.stringify({
          isAuth: true,
          token,
        })
      );
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    console.log('entra')
    try {
      dispatch({
        type: CONSTANTS.LOGOUT,
      });
      sessionStorage.removeItem("login");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    login,
    handleLogin,
    handleLogout,
  };
};
