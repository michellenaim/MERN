import * as TransactionApiUtil from "../util/transactions_api_util";

export const RECEIVE_All_TRANSACTIONS = "RECEIVE_All_TRANSACTIONS";
export const CREATE_TRANSACTION = "CREATE_TRANSACTION";
export const EDIT_TRANSACTION = "EDIT_TRANSACTION";
export const REMOVE_TRANSACTION = "REMOVE_TRANSACTION";
export const RECEIVE_TRANSACTION_ERRORS = "RECEIVE_TRANSACTION_ERRORS";
export const CLEAR_TRANSACTION_ERRORS = "CLEAR_TRANSACTION_ERRORS";

export const receiveAllTransactions = (transactions) => {
    return ({
        type: RECEIVE_All_TRANSACTIONS,
        transactions
    })
}

export const createTransaction = (transaction) => {
    return ({
        type: CREATE_TRANSACTION,
        transaction
    })
}

export const editTransaction = (transaction) => {
    return ({
        type: EDIT_TRANSACTION,
        transaction
    })
}

export const removeTransaction = (transaction) => {
    return ({
        type: REMOVE_TRANSACTION,
        transaction
    })
}

export const receiveTransactionErrors = (errors) => {
    return({
        type: RECEIVE_TRANSACTION_ERRORS,
        errors
    })
}

export const removeTransactionErrors = () => {
    return ({
        type: CLEAR_TRANSACTION_ERRORS
    })
}


export const fetchAllTransactions = () => dispatch => {
    return TransactionApiUtil.fetchAllTransactions()
        .then(transactions => dispatch(receiveAllTransactions(transactions)))
}

export const logTransaction = (transaction) => dispatch => {
    return TransactionApiUtil.logTransaction(transaction)
        .then(transaction => dispatch(createTransaction(transaction)))
        .catch(err => dispatch(receiveTransactionErrors(err)))
}

export const updateTransaction = (transaction) => dispatch => {
    return TransactionApiUtil.updateTransaction(transaction)
        .then(transaction => dispatch(editTransaction(transaction)))
}

export const deleteTransaction = (transaction) => dispatch => {
    return TransactionApiUtil.deleteTransaction(transaction)
        .then(transaction => dispatch(removeTransaction(transaction)))
}

export const clearTransactionErrors = () => (dispatch) => {
    return (
        dispatch(removeTransactionErrors())
    )
}


