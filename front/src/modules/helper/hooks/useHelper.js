import { useState } from "react"
import { getComerciantesService, getGroupsService, updateComerciantesTarjetaService } from "../services/helperService"
import { useAuth } from "../../auth/hooks/useAuth";
import toast from "react-hot-toast";


export const useHelper = () => {
    const { validateSession } = useAuth();
    const [groups, setGroups] = useState([])
    const [comerciantes, setComerciantes] = useState([])


    const getGroups = async () => {
        try {
            const result = await getGroupsService();
            setGroups(result);
        } catch (error) {
            validateSession(error)
        }
    }

    const getComerciantes = async () => {
        try {
            const result = await getComerciantesService();
            setComerciantes(result);
        } catch (error) {
            validateSession(error)
        }
    }

    const updateComerciantesTarjeta = async (data) => {
        const { id, tarifa, num_tarjeta } = data;
        try {
            const result = await updateComerciantesTarjetaService(id, tarifa, num_tarjeta);
            toast.success(result.message, {
                position: "top-center",
                duration: 1200,
            });
        } catch (error) {
            validateSession(error);
            if (error.response?.status === 409) {
                toast.error(error.response.data.message, {
                    position: "top-center",
                });
            }
        }
    }

    return {
        getGroups,
        groups,
        comerciantes,
        getComerciantes,
        updateComerciantesTarjeta,
    }
}