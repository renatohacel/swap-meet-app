import { axiosInstance } from "../../../utils/axiosInstance";

export const getHisotrialService = async () => {
  const response = await axiosInstance.get("/historial");
  return response.data;
};