import * as TransactionApiUtil from "../util/transactions_api_util";

export const RECEIVE_All_TRANSACTIONS = "RECEIVE_All_TRANSACTIONS";

export const receiveAllTransactions = (transactions) => {
    return ({
        type: RECEIVE_All_TRANSACTIONS,
        transactions
    })
}

export const fetchAllTransactions = () => (dispatch) => {
    return TransactionApiUtil.fetchAllTransactions()
        .then(transactions => dispatch(receiveAllTransactions(transactions)))
}
