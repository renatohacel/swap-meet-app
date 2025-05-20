import { useReducer, useState } from "react";
import { lotesReducer } from "../reducers/lotesReducer";
import { useAuth } from "../../../auth/hooks/useAuth";
import { CONSTANTS } from "../../../../utils/constans";
import { useNavigate } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";
import { getLotesService, insertLoteService } from "../services/genLoteService";
import toast from "react-hot-toast";

export const useGenLoteTarjetas = () => {
    const navigate = useNavigate();
    const { validateSession } = useAuth();
    const [lotes, dispatch] = useReducer(lotesReducer, [])
    const [loading, setLoading] = useState(false);

    const getLotes = async () => {
        try {
            setLoading(true);
            const result = await getLotesService();
            dispatch({
                type: CONSTANTS.LOTES.GET_LOTES,
                payload: result,
            });
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }

    const handleInsertLote = async (newLote) => {
        try {
            await insertLoteService(newLote);
            navigate(CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS, {
                state: {
                    toast: {
                        type: 'success',
                        message: 'LOTE CREADO CON ÉXITO'
                    }
                }
            })
        } catch (error) {
            validateSession(error);
            return toast.error(error.response?.data?.message, {
                position: "top-right",
                duration: 1500,
            });
        }
    }

    const editNavigate = (row) => {
        navigate(`${CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS}/update`, { state: { lote: row } })
    }


    return {
        lotes,
        loading,
        getLotes,
        editNavigate,
        handleInsertLote,
    }
}
