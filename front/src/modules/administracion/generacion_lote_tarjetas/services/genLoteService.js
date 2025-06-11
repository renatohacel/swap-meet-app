import { axiosInstance } from "../../../../utils/axiosInstance";


export const getLotesService = async () => {
  const response = await axiosInstance.get("/generacion-lotes");
  return response.data;
};

export const getTarjetasGService = async (id) => {
  const response = await axiosInstance.get(`/generacion-lotes/${id}`);
  return response.data;
};

export const insertLoteService = async (newLote) => {
  const response = await axiosInstance.post("/generacion-lotes", newLote);
  return response.data;
}

export const updateLoteService = async (updatedLote) => {
  const response = await axiosInstance.patch("/generacion-lotes", updatedLote);
  return response.data;
}