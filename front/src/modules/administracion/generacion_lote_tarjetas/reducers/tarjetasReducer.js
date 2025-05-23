import { CONSTANTS } from "../../../../utils/constans";


export const tarjetasReducer = (state = [], action) => {
    switch (action.type) {

        case CONSTANTS.TARJETAS.GET_TARJETAS:
            return action.payload;
        default:
            return state;
    }
}