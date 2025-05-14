import { axiosInstance } from "../../../../../utils/axiosInstance";


export const getTarifaTarjetasService = async () => {
    const response = await axiosInstance.get("/tarifas/tarjetas");
    return response.data;
};

// export const updateTarifaTarjetasService = async (updatedTarifa) => {
//     const response = await axiosInstance.patch('/tarifas/puestos', updatedTarifa);
//     return response.data
// }