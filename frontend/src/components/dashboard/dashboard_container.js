import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchAllTransactions } from '../../actions/transactions_actions'


const mapStateToProps = (state) => {
    return {
        //need current user in our state => firstname but there is only email in the state right now
        firstname: state.session.user.firstname,
        transactions: state.entities.transactions.data,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTransactions: () => dispatch(fetchAllTransactions()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);