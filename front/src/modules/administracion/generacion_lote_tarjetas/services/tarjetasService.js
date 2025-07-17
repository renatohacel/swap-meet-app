import { axiosInstance } from "../../../../utils/axiosInstance";


export const getTarjetasService = async (id) => {
    const response = await axiosInstance.get(`/tarjetas/${id}`);
    return response.data;
};

export const cancelTarjetaService = async (id) => {
    const response = await axiosInstance.patch(`/tarjetas/${id}`);
    return response.data;
}