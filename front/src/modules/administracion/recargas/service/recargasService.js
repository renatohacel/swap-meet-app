


import { axiosInstance } from "../../../../utils/axiosInstance";

export const getRecargasService = async () => {
    const response = await axiosInstance.get("/recargas");
    return response.data;
};