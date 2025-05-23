import { useReducer, useState } from 'react'
import { getTarjetasService } from '../services/tarjetasService'
import { useAuth } from '../../../auth/hooks/useAuth'
import { tarjetasReducer } from '../reducers/tarjetasReducer';
import { CONSTANTS } from '../../../../utils/constans';

export const useTarjetas = () => {
    const { validateSession } = useAuth();
    const [loading, setLoading] = useState(false)
    const [tarjetas, dispatch] = useReducer(tarjetasReducer, [])

    const getTarjetas = async (id) => {
        try {
            setLoading(true)
            const result = await getTarjetasService(id)
            dispatch({
                type: CONSTANTS.TARJETAS.GET_TARJETAS,
                payload: result
            })
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false)
        }
    }

    return {
        tarjetas,
        getTarjetas,
        loading,
    }
}
