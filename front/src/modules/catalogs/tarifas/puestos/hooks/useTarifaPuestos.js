import { useReducer } from "react"
import { tarifaPuestosReducer } from "../reducers/tarifaPuestosReducer"
import { getTarifaPuestosService, updateTarifaPuestosService } from "../services/tarifaPuestosService"
import { CONSTANTS } from "../../../../../utils/constans"
import { useAuth } from "../../../../auth/hooks/useAuth"
import toast from "react-hot-toast"

export const useTarifaPuestos = () => {

  const { validateSession } = useAuth()

  const [puestos, dispatch] = useReducer(tarifaPuestosReducer, {})

  const getTarifaPuestos = async () => {
    try {
      const result = await getTarifaPuestosService();
      dispatch({
        type: CONSTANTS.TARIFAS.PUESTOS.GET_TARIFAS,
        payload: result,
      });
    } catch (error) {
      validateSession(error);
    }
  }

  const updateTarifaPuestos = async (updatedTarifa) => {
    try {
      const result = await updateTarifaPuestosService(updatedTarifa);
      dispatch({
        type: CONSTANTS.TARIFAS.PUESTOS.UPDATE_TARIFAS,
        payload: result
      })
      return toast.success("TARIFAS ACTUALIZADAS CON ÉXITO", {
        duration: 1500,
        position: "top-right",
      });
    } catch (error) {
      validateSession(error);
    }
  }

  return {
    puestos,
    //functions
    getTarifaPuestos,
    updateTarifaPuestos,
  }
}
