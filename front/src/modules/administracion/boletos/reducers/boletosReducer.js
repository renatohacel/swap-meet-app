import { CONSTANTS } from "../../../../utils/constans";


export const boletosReducer = (state, action) => {
    switch (action.type) {
        case CONSTANTS.BOLETOS.GET_BOLETOS:
            return action.payload
        default:
            return state;
    }
}