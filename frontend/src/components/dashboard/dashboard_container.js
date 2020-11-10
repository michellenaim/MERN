import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchAllTransactions } from '../../actions/transactions_actions';
import { fetchCurrentUser } from '../../actions/users_actions';


const mapStateToProps = (state) => {
    return {
        firstname: state.session.user.firstname,
        transactions: state.entities.transactions.data,
        currentUser: state.entities.currentUser.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTransactions: () => dispatch(fetchAllTransactions()),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);