import { CONSTANTS } from "../../../../utils/constans";


export const tarjetasReducer = (state = [], action) => {
    switch (action.type) {

        case CONSTANTS.TARJETAS.GET_TARJETAS:
            return action.payload;
        case CONSTANTS.TARJETAS.CANCEL_TARJETA:
            return state.map((tarjeta) => {
                if (tarjeta.IdTarjetaGD === action.payload.IdTarjetaGD) {
                    return {
                        ...action.payload
                    }
                }
                return tarjeta;
            })
        default:
            return state;
    }
}