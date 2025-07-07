import { CONSTANTS } from "../../../utils/constans";


export const helperReducer = (state = [], action) => {
    switch (action.type) {
        case CONSTANTS.HELPER.GET_GROUPS:
            return action.payload;
        default:
            return state
    }
}