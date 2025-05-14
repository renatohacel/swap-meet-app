import { CONSTANTS } from "../../../../../utils/constans";


export const tarifaPuestosReducer = (state = {}, action) => {
    switch (action.type) {

        case CONSTANTS.TARIFAS.PUESTOS.GET_TARIFAS:
            return action.payload;


        case CONSTANTS.TARIFAS.PUESTOS.UPDATE_TARIFAS:
            return action.payload
        default:
            return state;
    }
};
