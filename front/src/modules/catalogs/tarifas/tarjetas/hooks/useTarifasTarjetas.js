import { useReducer, useState } from "react"
import { useAuth } from "../../../../auth/hooks/useAuth"
import { tarifaTarjetasReducer } from "../reducers/tarifaTarjetasReducer"
import { getTarifaTarjetasService } from "../services/tarifaTarjetasService"
import { CONSTANTS } from "../../../../../utils/constans"


export const useTarifasTarjetas = () => {

    const { validateSession } = useAuth()
    const [tarjetas, dispatch] = useReducer(tarifaTarjetasReducer, [])
    const [loading, setLoading] = useState(false);


    const getTarifasTarjetas = async () => {
        try {
            setLoading(true)
            const result = await getTarifaTarjetasService();
            dispatch({
                type: CONSTANTS.TARIFAS.TARJETAS.GET_TARIFAS,
                payload: result,
            });
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }


    return {
        tarjetas,
        loading,
        getTarifasTarjetas,
    }
}
