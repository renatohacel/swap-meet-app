import { CONSTANTS } from "../../../utils/constans";

export const historialReducer = (state = [], action) => {
    switch (action.type) {

        case CONSTANTS.HISTORIAL.GET_HISTORIAL:
            return action.payload;

        default:
            return state;
    }
};
