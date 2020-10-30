import { connect } from 'react-redux';
import EditBudgetForm from './edit_budget_form';
import { fetchCurrentUser } from '../../actions/users_actions';
import { updateBudgetBreakdown } from '../../actions/budget_actions';

const mapStateToProps = state => {
    return ({
        currentUser: state.entities.currentUser.data
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        updateBudgetBreakdown: (budgetBreakdown) => dispatch(updateBudgetBreakdown(budgetBreakdown)),
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudgetForm);