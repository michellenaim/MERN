import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchAllTransactions } from '../../actions/transactions_actions'
import { fetchBudgetBreakdown } from '../../actions/budget_actions';


const mapStateToProps = (state) => {
    return {
        //need current user in our state => firstname but there is only email in the state right now
        firstname: state.session.user.firstname,
        transactions: state.entities.transactions.data,
        budgetBreakdown: state.entities.budgetBreakdown.data
        // might need to fetch the current user for their income
        //currentUser: state.entities.currentUser.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTransactions: () => dispatch(fetchAllTransactions()),
        fetchBudgetBreakdown: () => dispatch(fetchBudgetBreakdown())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);