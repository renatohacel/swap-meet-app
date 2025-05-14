import { CONSTANTS } from "../../../../../utils/constans";

export const tarifaTarjetasReducer = (state = [], action) => {
  switch (action.type) {

    case CONSTANTS.TARIFAS.TARJETAS.GET_TARIFAS:
      return action.payload;

    // case CONSTANTS.USERS.ADD_USER:
    //   return [action.payload, ...state];

    // case CONSTANTS.USERS.UPDATE_USER:
    //   return state.map((user) => {
    //     if (user.id === action.payload.id) {
    //       return {
    //         ...action.payload
    //       }
    //     }
    //   })
      
    default:
      return state;
  }
};
