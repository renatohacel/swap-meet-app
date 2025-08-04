import { axiosInstance } from "../../../utils/axiosInstance";

export const getGroupsService = async () => {
    const response = await axiosInstance.get("/helper/get-groups");
    return response.data;
}

export const getComerciantesService = async () => {
    const response = await axiosInstance.get("/helper/get-comerciantes-names");
    return response.data;
}

export const updateComerciantesTarjetaService = async (id, tarifa, num_tarjeta) => {
    const response = await axiosInstance.put(`/helper/update-tarjeta-comerciante/${id}`, { tarifa, num_tarjeta });
    return response.data;
}