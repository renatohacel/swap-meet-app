import axios from "axios";
import { CONSTANTS } from "../../../utils/constans";

export const loginUser = async ({ username, password }) => {
  const response = await axios.post(
    `${CONSTANTS.BASE_URL}/login`,
    { username, password },
    { withCredentials: true }
  );
  return response.data;
};
