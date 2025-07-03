import { useReducer, useState } from "react"
import { historialReducer } from "../reducers/historialReducer"
import { useAuth } from "../../auth/hooks/useAuth";
import { getHisotrialService } from "../services/historialService";
import { CONSTANTS } from "../../../utils/constans";


export const useHistorial = () => {

    const { validateSession } = useAuth();
    const [historial, dispatch] = useReducer(historialReducer, [])
    const [loading, setLoading] = useState(false);

    const getHistorial = async () => {
        try {
            setLoading(true);
            const result = await getHisotrialService();
            dispatch({
                type: CONSTANTS.HISTORIAL.GET_HISTORIAL,
                payload: result,
            });
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }


    return {
        historial,
        getHistorial,
        loading,
    }
}