import axios from "axios";
import { CONSTANTS } from "../../../utils/constans";

const axiosInstance = axios.create({
  baseURL: CONSTANTS.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async ({ username, password }) => {
  const response = await axiosInstance.post("/login", { username, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/logout", {});
  return response.data;
};