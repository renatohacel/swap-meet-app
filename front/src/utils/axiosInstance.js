import axios from "axios";
import { CONSTANTS } from "./constans";

export const axiosInstance = axios.create({
    baseURL: CONSTANTS.BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });