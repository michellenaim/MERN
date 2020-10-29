import { combineReducers } from "redux";
import EntitiesReducer from "./entities_reducer"
import session from "./session_reducer";
import errors from "./errors_reducer";

const RootReducer = combineReducers({
  entities: EntitiesReducer,
  session,
  errors
});

export default RootReducer;
