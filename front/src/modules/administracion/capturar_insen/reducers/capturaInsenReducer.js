import { CONSTANTS } from "../../../../utils/constans";




export const capturarInsenReducer = (state = [], action) => {

    switch (action.type) {
        case CONSTANTS.CAPTURAR_INSEN.GET_INSEN_BY_ID:
            return action.payload
        default:
            return state;
    }


}