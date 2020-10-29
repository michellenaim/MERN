import { combineReducers } from "redux";
import CurrentUserReducer from "./current_user_reducer"
import UsersReducer from "./users_reducer"

const EntitiesReducer = combineReducers({
    currentUser: CurrentUserReducer,
    users: UsersReducer,
    // transactions: TransactionsReducer    
});

export default EntitiesReducer;
