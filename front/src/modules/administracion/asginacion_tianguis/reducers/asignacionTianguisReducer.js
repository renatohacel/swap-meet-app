import { CONSTANTS } from "../../../../utils/constans";

export const asignacionTianguisReducer = (state = [], action) => {
    switch (action.type) {

        case CONSTANTS.ASIGNACION_TIANGUIS.GET_TIANGUIS:
            return action.payload;
        default:
            return state;
    }
}

export const asignacionTianguisByUserIdReducer = (state = [], action) => {
    switch (action.type) {
        case CONSTANTS.ASIGNACION_TIANGUIS.GET_TIANGUIS_BY_USER_ID:
            return action.payload;
        default:
            return state;
    }
}