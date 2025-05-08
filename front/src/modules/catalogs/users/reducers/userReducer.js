import { CONSTANTS } from "../../../../utils/constans";

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case CONSTANTS.GET_USERS:
      return action.payload;
    default:
      return state;
  }
};
