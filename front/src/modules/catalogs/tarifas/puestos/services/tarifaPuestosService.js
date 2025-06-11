import { axiosInstance } from "../../../../../utils/axiosInstance";


export const getTarifaPuestosService = async () => {
    const response = await axiosInstance.get("/tarifas/puestos");
    return response.data;
};

export const updateTarifaPuestosService = async (updatedTarifa) => {
    const response = await axiosInstance.patch('/tarifas/puestos', updatedTarifa);
    return response.data
}