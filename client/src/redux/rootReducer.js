import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";

//root
const rootReducer = combineReducers({
  auth: authReducer,
});

//export
export default rootReducer;
