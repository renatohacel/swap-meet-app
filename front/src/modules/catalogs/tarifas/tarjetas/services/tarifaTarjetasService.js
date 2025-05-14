import { axiosInstance } from "../../../../../utils/axiosInstance";


export const getTarifaTarjetasService = async () => {
    const response = await axiosInstance.get("/tarifas/tarjetas");
    return response.data;
};

export const insertTarifaTarjetasService = async (newTarifa) => {
    const response = await axiosInstance.post('/tarifas/tarjetas', newTarifa);
    return response.data;
}

export const updateTarifaTarjetasService = async (updatedTarifa) => {
    const response = await axiosInstance.patch('/tarifas/tarjetas', updatedTarifa);
    return response.data
}

export const deleteTarifaTarjetasService = async (id) => {
    const response = await axiosInstance.delete(`/tarifas/tarjetas/${id}`);
    return response.data
}