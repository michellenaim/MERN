import { connect } from 'react-redux';
import PolarGraph from './polar_graph';
import { fetchBudgetBreakdown } from '../../actions/budget_actions';
import { fetchCurrentUser } from '../../actions/users_actions';

const mapStateToProps = (state) => {
    return {
        //current user
        //current user's percentages/categories
        currentUser: state.entities.currentUser.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolarGraph);