import { 
    RECEIVE_All_TRANSACTIONS,
    RECEIVE_FILTERED_TRANSACTIONS,
    CREATE_TRANSACTION,
    EDIT_TRANSACTION,
    REMOVE_TRANSACTION
} from "../actions/transactions_actions";

const TransactionsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_All_TRANSACTIONS:
            return action.transactions
        case CREATE_TRANSACTION:
            return action.transaction
        case EDIT_TRANSACTION:
            return action.transaction
        case REMOVE_TRANSACTION:
            return action.transaction
        case RECEIVE_FILTERED_TRANSACTIONS:
            return action.transactions
        default:
            return state;
    }
};

export default TransactionsReducer;