import { axiosInstance } from "../../../../utils/axiosInstance";
import { CONSTANTS } from "../../../../utils/constans";

export const getBoletosService = async () => {
    const response = await axiosInstance.get("/boletos");
    return response.data;
};

export const printBoletosService = (id) => {
    window.open(`${CONSTANTS.BASE_URL}/boletos/print/${id}`, "_blank");
};