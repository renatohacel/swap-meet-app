import { axiosInstance } from "../../../utils/axiosInstance";

export const getGroupsService = async () => {
    const response = await axiosInstance.get("/helper/get-groups");
    return response.data;
}