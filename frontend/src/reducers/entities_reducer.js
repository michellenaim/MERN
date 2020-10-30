import { combineReducers } from "redux";
import CurrentUserReducer from "./current_user_reducer";
import UsersReducer from "./users_reducer";
import TransactionsReducer from './transactions_reducer';
import BudgetReducer from './budget_reducer';

const EntitiesReducer = combineReducers({
    users: UsersReducer,
    currentUser: CurrentUserReducer,
    budgetBreakdown: BudgetReducer,    
    transactions: TransactionsReducer   
});

export default EntitiesReducer;
