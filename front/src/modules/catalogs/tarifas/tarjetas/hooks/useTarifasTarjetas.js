import { useReducer, useState } from "react"
import { useAuth } from "../../../../auth/hooks/useAuth"
import { tarifaTarjetasReducer } from "../reducers/tarifaTarjetasReducer"
import { deleteTarifaTarjetasService, getTarifaTarjetasService, insertTarifaTarjetasService, updateTarifaTarjetasService } from "../services/tarifaTarjetasService"
import { CONSTANTS } from "../../../../../utils/constans"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"


export const useTarifasTarjetas = () => {
    const navigate = useNavigate();

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

    const handleInsertTarifa = async (newTarifa) => {
        try {
            const result = await insertTarifaTarjetasService(newTarifa);
            dispatch({
                type: CONSTANTS.TARIFAS.TARJETAS.ADD_TARIFA,
                payload: result,
            });
            navigate('/tarifas/tarjetas', {
                state: {
                    toast: {
                        type: 'success',
                        message: 'TARIFA CREADA CON ÉXITO'
                    }
                }
            });
        } catch (error) {
            validateSession(error);
            return toast.error(error.response?.data?.message, {
                position: "top-center",
                duration: 1500,
            });
        }
    }

    const handleUpdateTarifa = async (updatedTarifa) => {
        try {
            const result = await updateTarifaTarjetasService(updatedTarifa);
            dispatch({
                type: CONSTANTS.TARIFAS.TARJETAS.UPDATE_TARIFA,
                payload: result,
            });
            navigate('/tarifas/tarjetas', {
                state: {
                    toast: {
                        type: 'success',
                        message: 'TARIFA ACTUALIZADA CON ÉXITO'
                    }
                }
            });
        } catch (error) {
            validateSession(error);
            return toast.error(error.response?.data?.message, {
                position: "top-center",
                duration: 1500,
            });
        }
    }

    const handleDeleteTarifa = async (id) => {
        try {
            const result = await deleteTarifaTarjetasService(id)
            dispatch({
                type: CONSTANTS.TARIFAS.TARJETAS.DELETE_TARIFA,
                payload: id,
            });
            navigate('/tarifas/tarjetas', {
                state: {
                    toast: {
                        type: 'success',
                        message: result
                    }
                }
            });
        } catch (error) {
            validateSession(error);
            return toast.error(error.response?.data?.message, {
                position: "top-center",
                duration: 1500,
            });
        }
    }

    const editNavigate = (row) => {
        navigate('/tarifas/tarjetas/update', { state: { tarifa: row } })
    }


    return {
        tarjetas,
        loading,
        getTarifasTarjetas,
        handleInsertTarifa,
        handleUpdateTarifa,
        handleDeleteTarifa,
        editNavigate,
    }
}
