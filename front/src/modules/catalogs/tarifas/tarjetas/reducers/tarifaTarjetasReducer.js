import { CONSTANTS } from "../../../../../utils/constans";

export const tarifaTarjetasReducer = (state = [], action) => {
  switch (action.type) {

    case CONSTANTS.TARIFAS.TARJETAS.GET_TARIFAS:
      return action.payload;

    case CONSTANTS.TARIFAS.TARJETAS.ADD_TARIFA:
      return [action.payload, ...state];

    case CONSTANTS.TARIFAS.TARJETAS.UPDATE_TARIFA:
      return state.map((tarifa) => {
        if (tarifa.id === action.payload.id) {
          return {
            ...action.payload
          }
        }
      })

    case CONSTANTS.TARIFAS.TARJETAS.DELETE_TARIFA:
      return state.filter(tarif => tarif.id !== action.payload);

    default:
      return state;
  }
};
