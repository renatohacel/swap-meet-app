import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { CONSTANTS } from "../../../utils/constans";
import { loginUser, logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  user: undefined,
};

export const useAuth = () => {
  const [login, dispatch] = useReducer(authReducer, initialLogin);
  const navigate = useNavigate();

  const handleLogin = async ({ username, password }) => {
    try {
      const result = await loginUser({ username, password });
      dispatch({
        type: CONSTANTS.LOGIN,
        payload: result.user,
      });
      sessionStorage.setItem(
        "login",
        JSON.stringify({
          isAuth: true,
          user: result.user,
        })
      );
      navigate("/home");
    } catch (error) {
      return toast.error(error.response?.data?.message, {
        position: "top-center",
        duration: 1500,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch({
        type: CONSTANTS.LOGOUT,
      });
      sessionStorage.removeItem("login");
      navigate("/login");
    } catch (error) {
      validateSession(error);
    }
  };

  const validateSession = (error) => {
    if (error.response?.status === 401) {
      dispatch({
        type: CONSTANTS.LOGOUT,
      });
      sessionStorage.removeItem("login");
      window.location.reload();
    }
  };

  return {
    //constants
    login,

    //functions
    handleLogin,
    handleLogout,
    validateSession,
  };
};
