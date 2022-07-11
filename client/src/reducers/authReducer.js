import { FETCH_USER } from "../actions/types";

export default (state = null, action) => {
  console.log("🚀 ~ file: authReducer.js ~ line 4 ~ action", action)
  switch (action.type) {
    case FETCH_USER:
      return action.payload.data || false;
    default:
      return state;
  }
};
