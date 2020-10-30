import { combineReducers } from "redux";
import CurrentUserReducer from "./current_user_reducer"
import UsersReducer from "./users_reducer"
import TransactionsReducer from './transactions_reducer'

const EntitiesReducer = combineReducers({
    users: UsersReducer,
    currentUser: CurrentUserReducer,
    transactions: TransactionsReducer    
});

export default EntitiesReducer;
