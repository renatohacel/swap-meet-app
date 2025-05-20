import { useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import { getUsersService, insertUserService, updateUserService } from "../services/userService";
import { CONSTANTS } from "../../../../utils/constans";
import { useAuth } from "../../../auth/hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";

export const useUser = () => {
  const navigate = useNavigate();
  const { validateSession } = useAuth();
  const [users, dispatch] = useReducer(userReducer, []);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const result = await getUsersService();
      dispatch({
        type: CONSTANTS.USERS.GET_USERS,
        payload: result,
      });
    } catch (error) {
      validateSession(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInsertUser = async (newUser) => {
    try {
      const result = await insertUserService(newUser)

      dispatch({
        type: CONSTANTS.USERS.ADD_USER,
        payload: result,
      });
      navigate(CONSTANTS_ROUTES.CATALOGO.USUARIOS, {
        state: {
          toast: {
            type: 'success',
            message: 'USUARIO CREADO CON ÉXITO'
          }
        }
      });

    } catch (error) {
      validateSession(error);
      return toast.error(error.response?.data?.message, {
        position: "top-right",
        duration: 1500,
      });
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const result = await updateUserService(updatedUser);

      dispatch({
        type: CONSTANTS.USERS.UPDATE_USER,
        payload: result,
      });

      navigate(CONSTANTS_ROUTES.CATALOGO.USUARIOS, {
        state: {
          toast: {
            type: 'success',
            message: 'USUARIO ACTUALIZADO CON ÉXITO'
          }
        }
      });

    } catch (error) {
      validateSession(error);
      return toast.error(error.response?.data?.message, {
        position: "top-right",
        duration: 1500,
      });
    }
  }

  const editNavigate = (row) => {
    navigate(`${CONSTANTS_ROUTES.CATALOGO.USUARIOS}/update`, { state: { user: row } })
  }

  return {
    //constants
    users,
    loading,
    //functions
    getUsers,
    handleInsertUser,
    handleUpdateUser,
    editNavigate,
  };
};
