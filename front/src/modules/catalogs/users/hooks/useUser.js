import { useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import { getActiveUsersService, getUserByIdService, getUsersService, insertUserService, updatePasswordService, updateUserService } from "../services/userService";
import { CONSTANTS } from "../../../../utils/constans";
import { useAuth } from "../../../auth/hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";

export const useUser = () => {
  const navigate = useNavigate();
  const { validateSession, handleLogout } = useAuth();
  const [users, dispatch] = useReducer(userReducer, []);
  const [loading, setLoading] = useState(false);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const getUsers = async (isPolling = false) => {
    try {
      if (!isPolling) setLoading(true);
      const result = await getUsersService();
      dispatch({
        type: CONSTANTS.USERS.GET_USERS,
        payload: result,
      });
      if (isInitialLoad) setIsInitialLoad(false);
    } catch (error) {
      validateSession(error);
    } finally {
      if (!isPolling) setLoading(false);
    }
  };

  const getActiveUsers = async () => {
    try {
      setLoading(true);
      const result = await getActiveUsersService();
      dispatch({
        type: CONSTANTS.USERS.GET_USERS,
        payload: result,
      });
    } catch (error) {
      validateSession(error);
    } finally {
      setLoading(false);
    }
  }

  const getUserById = async (id) => {
    try {
      const result = await getUserByIdService(id);
      return result;
    } catch (error) {
      validateSession(error);
    }
  }

  const handleInsertUser = async (newUser) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }

  const handleUpdatePassword = async (passwords) => {
    try {
      const result = await updatePasswordService(passwords);
      if (result?.Error) {
        return toast.error(result.Error, {
          position: "top-right",
          duration: 1500,
        });
      }

      toast.success('CONTRASEÑA ACTUALIZADA CON ÉXITO', {
        position: "top-center",
        duration: 1000,
      });

      setTimeout(() => {
        const logoutPromise = new Promise((resolve) => {
          setTimeout(() => {
            handleLogout();
            window.location.reload();
            resolve();
          }, 1500);
        });

        toast.promise(logoutPromise, {
          loading: 'CERRANDO SESIÓN...',
          error: 'Error al cerrar sesión',
        });
      }, 1000);


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
    getActiveUsers,
    handleInsertUser,
    handleUpdateUser,
    handleUpdatePassword,
    editNavigate,
    getUserById,
    isInitialLoad,
  };
};
