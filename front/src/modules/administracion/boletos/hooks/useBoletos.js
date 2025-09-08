import { useReducer, useState } from "react"
import { getBoletosService, printBoletosService } from "../services/boletosServices";
import { useAuth } from "../../../auth/hooks/useAuth";
import { boletosReducer } from "../reducers/boletosReducer";
import { CONSTANTS } from "../../../../utils/constans";


export const useBoletos = () => {

    const { validateSession } = useAuth();

    const [boletos, dispatch] = useReducer(boletosReducer, []);
    const [loading, setLoading] = useState(false);


    const getBoletos = async () => {
        try {
            setLoading(true);
            const boletos = await getBoletosService();
            dispatch({ type: CONSTANTS.BOLETOS.GET_BOLETOS, payload: boletos });
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }

    const printBoletos = async (id) => {
        try {
            setLoading(true);
            await printBoletosService(id);
        } catch (error) {
            validateSession(error);
            
        } finally {
            setLoading(false);
        }
    }

    return {
        getBoletos,
        printBoletos,
        boletos,
        loading,
    }
}
