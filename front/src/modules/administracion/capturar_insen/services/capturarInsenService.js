import { axiosInstance } from "../../../../utils/axiosInstance";


export const getInsenByIdService = async (id) => {
    const response = await axiosInstance.get(`/capturar-insen/${id}`);
    return response.data;
}


export const updateInsenService = async (id, movimiento) => {
    const response = await axiosInstance.put(`/capturar-insen/${id}`, { movimiento });
    return response.data;
}