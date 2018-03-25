import { USER_VALID, USER_INVALID } from "../constants/action-types";

const userReducer = (state = {valid: false}, action) => {
  switch (action.type) {
    case USER_VALID:
      return Object.assign(state, action.payload, {
      	valid: true
      }); 
    case USER_INVALID:
     return Object.assign(state, action.payload, {
      	valid: false
      }); 
    default:
      return state;
  }
};

export default userReducer;
