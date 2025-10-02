/* eslint-disable no-unused-vars */
import { useReducer, useState } from "react";
import { lotesReducer, tarjetasGenReducer } from "../reducers/lotesReducer";
import { useAuth } from "../../../auth/hooks/useAuth";
import { CONSTANTS } from "../../../../utils/constans";
import { useNavigate } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";
import { deleteLoteService, getLotesService, getTarjetasGService, insertLoteService, printLoteService } from "../services/genLoteService";
import toast from "react-hot-toast";

export const useGenLoteTarjetas = () => {
    const navigate = useNavigate();
    const { validateSession } = useAuth();
    const [lotes, dispatch] = useReducer(lotesReducer, [])
    const [tarjetasGen, dispatchTG] = useReducer(tarjetasGenReducer, [])
    const [loading, setLoading] = useState(false);
    const [printing, setPrinting] = useState(false);

    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const getLotes = async (isPolling = false) => {
        try {
            if (!isPolling) setLoading(true);
            const result = await getLotesService();
            dispatch({
                type: CONSTANTS.LOTES.GET_LOTES,
                payload: result,
            });
            if (isInitialLoad) setIsInitialLoad(false);
        } catch (error) {
            validateSession(error);
        } finally {
            if (!isPolling) setLoading(false);
        }
    }

    const getTarjetasG = async (id) => {
        try {
            const result = await getTarjetasGService(id)
            dispatchTG({
                type: CONSTANTS.LOTES.GET_TARJETAS_G,
                payload: result
            })
        } catch (error) {
            validateSession(error);
        }
    }

    const handleInsertLote = async (newLote) => {
        return toast.promise(
            insertLoteService(newLote)
                .then(() => {
                    navigate(CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS, {
                        state: {
                            toast: {
                                type: 'success',
                                message: 'LOTE CREADO CON ÉXITO'
                            }
                        }
                    });
                })
                .catch((error) => {
                    validateSession(error);
                    throw new Error(error.response?.data?.message || "Error al crear lote");
                }),
            {
                loading: 'CREANDO LOTE...',
                success: () => null,
                error: (err) => err.message,
            },
            {
                position: 'top-right',
            }
        );
    }

    const handleDeleteLote = async (id) => {
        return toast.promise(
            deleteLoteService(id)
                .then(() => {
                    navigate(CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS, {
                        state: {
                            toast: {
                                type: 'success',
                                message: 'LOTE ELIMINADO CON ÉXITO'
                            }
                        }
                    });
                })
                .catch((error) => {
                    validateSession(error);
                    throw new Error(error.response?.data?.message || "Error al eliminar lote");
                }),
            {
                loading: 'ELIMINANDO LOTE...',
                success: () => null,
                error: (err) => err.message,
            },
            {
                position: 'top-right',
            }
        );
    }

    const editNavigate = (row) => {
        navigate(`${CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS}/update`, { state: { lote: row } })
    }

    const viewNavigate = (row) => {
        navigate(`${CONSTANTS_ROUTES.ADMIN.LOTES.GENERACION_TARJETAS}/view`, { state: { lote: row } })
    }

    const printLote = async (row) => {
        setPrinting(true);
        try {
            await printLoteService(row.id);
        } catch (error) {
            validateSession(error);
        } finally {
            setPrinting(false);
        }
    }

    return {
        lotes,
        loading,
        getLotes,
        getTarjetasG,
        editNavigate,
        handleInsertLote,
        handleDeleteLote,
        tarjetasGen,
        viewNavigate,
        isInitialLoad,
        printLote,
        printing,
    }
}
