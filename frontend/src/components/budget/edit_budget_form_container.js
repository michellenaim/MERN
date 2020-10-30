import { connect } from 'react-redux';
import EditBudgetForm from './edit_budget_form';
import { fetchCurrentUser } from '../../actions/users_actions';

const mapStateToProps = state => {
    return ({
        currentUser: state.entities.currentUser.data
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        // TODO: dispatch updated user ( including their updated budget) to user's reducer
        // updateUsersBudget: (param) => dispatch(updateUsersBudget(param))
        fetchCurrentUser: () => dispatch(fetchCurrentUser())
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudgetForm);