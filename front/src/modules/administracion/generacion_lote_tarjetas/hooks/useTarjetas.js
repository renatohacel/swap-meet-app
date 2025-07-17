import { useReducer, useState } from 'react'
import { cancelTarjetaService, getTarjetasService } from '../services/tarjetasService'
import { useAuth } from '../../../auth/hooks/useAuth'
import { tarjetasReducer } from '../reducers/tarjetasReducer';
import { CONSTANTS } from '../../../../utils/constans';
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

export const useTarjetas = () => {
    const { validateSession } = useAuth();
    // const navigate = useNavigate();

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

    const cancelFunction = async (row) => {
        try {
            setLoading(true);
            const result = await cancelTarjetaService(row.id);

            console.log(result)

            dispatch({
                type: CONSTANTS.TARJETAS.CANCEL_TARJETA,
                payload: result
            })

            // Simular éxito por ahora
            toast.success(`Tarjeta ${row.numero_tarjeta} cancelada exitosamente`, { duration: 1000, position: 'top-right' });

        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al cancelar la tarjeta', { duration: 1500, position: 'top-right' });
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }

    return {
        tarjetas,
        getTarjetas,
        loading,
        cancelFunction,
    }
}
