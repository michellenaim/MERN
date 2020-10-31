import { RECEIVE_UPDATED_TRANSACTION_ERRORS, CLEAR_TRANSACTION_ERRORS } from "../actions/transactions_actions";

const _nullErrors = [];

const UpdateTransactionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_UPDATED_TRANSACTION_ERRORS:
            return action.errors;
        case CLEAR_TRANSACTION_ERRORS:
            return _nullErrors;
        default:
            return state;
    }
}

export default UpdateTransactionErrorsReducer
