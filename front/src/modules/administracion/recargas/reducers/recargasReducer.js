import { CONSTANTS } from "../../../../utils/constans";


export const recargasReducer = (state, action) => {
    switch (action.type) {
        case CONSTANTS.RECARGAS.GET_RECARGAS:
            return action.payload
        default:
            return state;
    }
}