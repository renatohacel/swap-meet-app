import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

const initialLogin = JSON.parse(sessionStorage.getItem("login")) || {
  isAuth: false,
  user: undefined,
};

export const useAuth = () => {
  const [login, dispatch] = useReducer(authReducer, initialLogin);


    const handleLogin = async ({username, password}) => {
        try {
            const {user} = await 
        } catch (error) {
            
        }
    }
  return {
    login,
  };
};
