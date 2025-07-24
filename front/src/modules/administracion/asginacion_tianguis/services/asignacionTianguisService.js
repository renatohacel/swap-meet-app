import { axiosInstance } from "../../../../utils/axiosInstance";

export const getAsignacionTianguisService = async () => {
    const response = await axiosInstance.get("/asignacion-tianguis");
    return response.data;
};

export const getAsignacionTianguisByUserIdService = async (id) => {
    const response = await axiosInstance.get(`/asignacion-tianguis/${id}`);
    return response.data;
}

export const insertTianguisToUserService = async ({ id, tianguis }) => {
    const response = await axiosInstance.post("/asignacion-tianguis", { id, tianguis });
    return response.data;
}

export const deleteTianguisFromUserService = async ({ id, tianguis }) => {
    const response = await axiosInstance.patch("/asignacion-tianguis", { id, tianguis });
    return response.data;
}
