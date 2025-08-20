import { useReducer, useState } from "react"
import { recargasReducer } from "../reducers/recargasReducer";
import { getRecargasService } from "../service/recargasService";
import { CONSTANTS } from "../../../../utils/constans";
import { useAuth } from "../../../auth/hooks/useAuth";

export const useRecargas = () => {
    const { validateSession } = useAuth();

    const [loading, setLoading] = useState(false);
    const [recargas, dispatch] = useReducer(recargasReducer, []);

    const [isInitialLoad, setIsInitialLoad] = useState(true);


    const getRecargas = async (isPolling = false) => {
        if (!isPolling) setLoading(true);
        try {
            const response = await getRecargasService();
            dispatch({
                type: CONSTANTS.RECARGAS.GET_RECARGAS,
                payload: response
            });
            if (isInitialLoad) setIsInitialLoad(false);
        } catch (error) {
            validateSession(error);
        } finally {
            if (!isPolling) setLoading(false);
        }
    }


    return {
        recargas,
        loading,
        getRecargas,
        isInitialLoad,
    }
}
