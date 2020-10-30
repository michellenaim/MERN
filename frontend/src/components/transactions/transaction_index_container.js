import { connect } from 'react-redux';
import TransactionIndex from './transaction_index';
import { fetchAllTransactions } from '../../actions/transactions_actions'

const mapStateToProps = (state) => {
    return {
        transactions: Object.values(state.entities.transactions),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTransactions: () => dispatch(fetchAllTransactions())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TransactionIndex);