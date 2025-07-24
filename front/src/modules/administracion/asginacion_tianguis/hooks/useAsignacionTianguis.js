import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONSTANTS_ROUTES } from "../../../../utils/constansRoutes";
import { deleteTianguisFromUserService, getAsignacionTianguisByUserIdService, getAsignacionTianguisService, insertTianguisToUserService } from "../services/asignacionTianguisService";
import { asignacionTianguisByUserIdReducer, asignacionTianguisReducer } from "../reducers/asignacionTianguisReducer";
import { CONSTANTS } from "../../../../utils/constans";
import { useAuth } from "../../../auth/hooks/useAuth";

export const useAsignacionTianguis = () => {
    const navigate = useNavigate();
    const { validateSession } = useAuth();
    const [loading, setLoading] = useState(false);
    const [tianguis, dispatch] = useReducer(asignacionTianguisReducer, [])
    const [tianguisByUserId, dispatchByUserId] = useReducer(asignacionTianguisByUserIdReducer, []);

    const getListadoTianguis = async () => {
        try {
            setLoading(true);
            const result = await getAsignacionTianguisService();
            dispatch({
                type: CONSTANTS.ASIGNACION_TIANGUIS.GET_TIANGUIS,
                payload: result,
            });
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }

    const getTianguisByUserId = async (id) => {
        try {
            setLoading(true);
            const result = await getAsignacionTianguisByUserIdService(id);
            dispatchByUserId({
                type: CONSTANTS.ASIGNACION_TIANGUIS.GET_TIANGUIS_BY_USER_ID,
                payload: result,
            });
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }

    const insertTianguisToUser = async (id, tianguis) => {
        try {
            setLoading(true);
            await insertTianguisToUserService({ id, tianguis });
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }

    const deleteTianguisFromUser = async (id, tianguis) => {
        try {
            setLoading(true);
            await deleteTianguisFromUserService({ id, tianguis });
        } catch (error) {
            validateSession(error);
        } finally {
            setLoading(false);
        }
    }

    const editNavigate = (row) => {
        navigate(`${CONSTANTS_ROUTES.ADMIN.ASIGNACION_TIANGUIS}/update`, { state: { user: row } })
    }

    return {
        loading,
        tianguis,
        tianguisByUserId,
        getListadoTianguis,
        editNavigate,
        getTianguisByUserId,
        insertTianguisToUser,
        deleteTianguisFromUser,
    }
}
