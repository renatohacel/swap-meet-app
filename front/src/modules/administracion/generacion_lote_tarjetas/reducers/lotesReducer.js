import { CONSTANTS } from "../../../../utils/constans";

export const lotesReducer = (state = [], action) => {
    switch (action.type) {

        case CONSTANTS.LOTES.GET_LOTES:
            return action.payload;

        // case CONSTANTS.USERS.ADD_USER:
        //     return [action.payload, ...state];

        // case CONSTANTS.USERS.UPDATE_USER:
        //     return state.map((user) => {
        //         if (user.id === action.payload.id) {
        //             return {
        //                 ...action.payload
        //             }
        //         }
        //     })
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
