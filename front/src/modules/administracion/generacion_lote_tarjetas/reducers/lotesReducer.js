import { CONSTANTS } from "../../../../utils/constans";

export const lotesReducer = (state = [], action) => {
    switch (action.type) {

        case CONSTANTS.LOTES.GET_LOTES:
            return action.payload;
        default:
            return state;
    }
}

export const tarjetasGenReducer = (state = [], action) => {
    switch (action.type) {
        case CONSTANTS.LOTES.GET_TARJETAS_G:
            return action.payload
        default:
            return state;
    }
}
