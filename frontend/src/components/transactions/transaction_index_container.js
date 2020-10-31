import { connect } from 'react-redux';
import TransactionIndex from './transaction_index';
import { fetchAllTransactions, logTransaction, receiveTransactionErrors, deleteTransaction, updateTransaction } from '../../actions/transactions_actions'
import selectTransactionsByCategory from './selector'

const mapStateToProps = (state) => {
    return {
        // transactions: selectTransactionsByCategory(state.entities.transactions, "Home")
        transactions: state.entities.transactions,
        errors: Object.values(state.errors.transaction)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTransactions: () => dispatch(fetchAllTransactions()),
        createTransaction: (transaction) => dispatch(logTransaction(transaction)),
        deleteTransaction: (transaction) => dispatch(deleteTransaction(transaction)),
        editTransaction: (transaction) => dispatch(updateTransaction(transaction)),
        clearTransactionErrors: () => dispatch(receiveTransactionErrors([]))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TransactionIndex);