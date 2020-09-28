import { combineReducers } from "redux";
import themeModeReducer from "./themeModeReducer";
import authReducer from "../reducers/authReducers";
import errorReducer from "../reducers/errorReducers";

export default combineReducers({
  themeModeReducer: themeModeReducer,
  auth: authReducer,
  errors: errorReducer,
});
