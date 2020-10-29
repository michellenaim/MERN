import { connect } from 'react-redux';
import EditBudgetForm from './edit_budget_form';
// import budget_actions
// import category_actions

const mapStateToProps = state => {
    return ({
        // TODO: grab current logged in user's info from state
        // currentUser: state.entities.users[state.session.currentUser.id]
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        // TODO: dispatch updated user ( including their updated budget) to user's reducer
        // updateUser: (user) => dispatch(updateUser(user))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudgetForm);