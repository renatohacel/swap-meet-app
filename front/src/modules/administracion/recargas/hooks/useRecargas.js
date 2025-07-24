import { useReducer, useState } from "react"
import { recargasReducer } from "../reducers/recargasReducer";
import { getRecargasService } from "../service/recargasService";
import { CONSTANTS } from "../../../../utils/constans";
import { useAuth } from "../../../auth/hooks/useAuth";

export const useRecargas = () => {
    const { validateSession } = useAuth();

    const [loading, setLoading] = useState(false);
    const [recargas, dispatch] = useReducer(recargasReducer, []);


    const getRecargas = async () => {
        setLoading(true);
        try {
            const response = await getRecargasService();
            dispatch({
                type: CONSTANTS.RECARGAS.GET_RECARGAS,
                payload: response
            });
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }


    return {
        recargas,
        loading,
        getRecargas,
    }
}
