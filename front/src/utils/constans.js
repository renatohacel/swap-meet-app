/* eslint-disable no-constant-binary-expression */
export const CONSTANTS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  BASE_URL: import.meta.env.VITE_BASE_URL_BACKEND || "http://localhost:3000",

  //---------------------------------------------------------------------//
  //                            CATALOGS                                 //
  //---------------------------------------------------------------------//
  //------------------------------- USERS -------------------------------//
  GET_USERS: "GET_USERS",
  ADD_USER: "ADD_USER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
};
