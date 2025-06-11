import { axiosInstance } from "../../../utils/axiosInstance";

export const loginUser = async ({ username, password }) => {
  const response = await axiosInstance.post("/login", { username, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/logout", {});
  return response.data;
};
