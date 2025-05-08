import { useReducer, useState } from "react";
import { userReducer } from "../reducers/userReducer";
import { getUsersService } from "../services/userService";
import { CONSTANTS } from "../../../../utils/constans";
import { useAuth } from "../../../auth/hooks/useAuth";

export const useUser = () => {
  const { validateSession } = useAuth();
  const [users, dispatch] = useReducer(userReducer, []);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const result = await getUsersService();
      dispatch({
        type: CONSTANTS.GET_USERS,
        payload: result,
      });
    } catch (error) {
      validateSession(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    //constants
    users,
    loading,
    //functions
    getUsers,
  };
};
