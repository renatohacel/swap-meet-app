/* eslint-disable no-constant-binary-expression */
export const CONSTANTS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  BASE_URL: import.meta.env.VITE_BASE_URL_BACKEND || "http://localhost:3000",

  //---------------------------------------------------------------------//
  //                            CATALOGS                                 //
  //---------------------------------------------------------------------//
  //------------------------------- USERS -------------------------------//
  USERS: {
    GET_USERS: "GET_USERS",
    ADD_USER: "ADD_USER",
    UPDATE_USER: "UPDATE_USER",
    DELETE_USER: "DELETE_USER",
    //---------------------------- TIPOS USERS ----------------------------//
    USERS_TYPES: [
      { value: "ADMON", label: "ADMON" },
      { value: "CAJERO", label: "CAJERO" },
      { value: "ACTIVACION", label: "ACTIVACIÓN" },
    ],
    USERS_STATUS: [
      { value: "INACTIVO", label: "INACTIVO" },
      { value: "ACTIVO", label: "ACTIVO" },
    ],
    //-------------------------------FORM----------------------------------//
    USER_FORM: [
      { label: "USUARIO", name: "username", type: "text" },
      {
        label: "CONTRASEÑA",
        name: "password",
        type: "password",
      },
      {
        label: "APELLIDO PATERNO",
        name: "first_lastname",
        type: "text",
      },
      {
        label: "APELLIDO MATERNO",
        name: "second_lastname",
        type: "text",
      },
      { label: "NOMBRE", name: "full_name", type: "text" },
    ],
  },

  TARIFAS: {
    PUESTOS: {
      GET_TARIFAS: 'GET_TARIFAS_PUESTOS',
      UPDATE_TARIFAS: 'UPDATE_TARIFAS_PUESTOS',

      TARIFAS_FORM: {
        TARIFAS_BASE: [
          {
            label: "TARIFA A",
            name: "tarifa_a",
            type: "number"
          },
          {
            label: "TARIFA B",
            name: "tarifa_b",
            type: "number",
          },
          {
            label: "TARIFA C",
            name: "tarifa_c",
            type: "number",
          },
        ],
        TARIFAS_INSEN: [
          {
            label: "TARIFA A INSEN",
            name: "tarifa_a_insen",
            type: "number"
          },
          {
            label: "TARIFA B INSEN",
            name: "tarifa_b_insen",
            type: "number",
          },
          {
            label: "TARIFA C INSEN",
            name: "tarifa_c_insen",
            type: "number",
          },
        ],

        BASURA: [{ label: "BASURA", name: "basura", type: "number" }],
      }
    },
    TARJETAS: {
      GET_TARIFAS: 'GET_TARIFAS_TARJETAS'
    }
  },
};
