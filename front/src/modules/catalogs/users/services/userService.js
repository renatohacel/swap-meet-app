import { axiosInstance } from "../../../../utils/axiosInstance";

export const getUsersService = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};
