import { connect } from 'react-redux';
import TransactionIndex from './transaction_index';
import { fetchAllTransactions } from '../../actions/transactions_actions'
import selectTransactionsByCategory from './selector'

const mapStateToProps = (state) => {
    return {
        // transactions: selectTransactionsByCategory(state.entities.transactions, "Home")
        transactions: state.entities.transactions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTransactions: () => dispatch(fetchAllTransactions()),
        // createTransaction: ,
        // deleteTransaction: ,
        // updateTransaction: ,
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TransactionIndex);