import { axiosInstance } from "../../../../utils/axiosInstance";

export const getUsersService = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const getActiveUsersService = async () => {
  const response = await axiosInstance.get("/users/actives");
  return response.data;
}

export const getUserByIdService = async (id) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const insertUserService = async (newUser) => {
  const response = await axiosInstance.post("/users", newUser);
  return response.data;
};

export const updateUserService = async (user) => {
  const response = await axiosInstance.patch(`/users/${user.id}`, user);
  return response.data;
};

export const updatePasswordService = async (passwords) => {
  const response = await axiosInstance.put("/users/change_password", passwords);
  return response.data;
};
