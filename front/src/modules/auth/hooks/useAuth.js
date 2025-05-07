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
      const response = await loginUser({ username, password });
      dispatch({
        type: CONSTANTS.LOGIN,
        payload: response.user,
      });
      sessionStorage.setItem(
        "login",
        JSON.stringify({
          isAuth: true,
          user: response.user,
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
      console.error(error);
    }
  };

  return {
    login,
    handleLogin,
    handleLogout,
  };
};
