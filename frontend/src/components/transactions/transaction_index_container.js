import { connect } from 'react-redux';
import TransactionIndex from './transaction_index';
import { fetchAllTransactions, logTransaction, clearTransactionErrors } from '../../actions/transactions_actions'
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
        // deleteTransaction: ,
        // updateTransaction: ,
        clearTransactionErrors: () => dispatch(clearTransactionErrors())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TransactionIndex);