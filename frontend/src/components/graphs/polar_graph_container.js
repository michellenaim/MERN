import { connect } from 'react-redux';
import PolarGraph from './polar_graph';
import { fetchBudgetBreakdown } from '../../actions/budget_actions';
import { fetchCurrentUser } from '../../actions/users_actions';

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.currentUser.data,
        budgetBreakdown: state.entities.budgetBreakdown,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser: () => dispatch(fetchCurrentUser()),
        fetchBudgetBreakdown: () => dispatch(fetchBudgetBreakdown())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolarGraph);