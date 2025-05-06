import { CONSTANTS } from "../../../utils/constans";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.LOGIN:
      return {
        isAuth: true,
        token: action.payload,
      };
    case CONSTANTS.LOGOUT:
      return {
        isAuth: false,
      };
    default:
      return state;
  }
};
