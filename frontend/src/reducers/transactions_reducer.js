import { RECEIVE_All_TRANSACTIONS } from "../actions/transactions_actions";

const TransactionsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_All_TRANSACTIONS:
            return action.transactions
        default:
            return state;
    }
};

export default TransactionsReducer;