// import {} from "../actions/user_actions";

const CurrentUserReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        // case RECEIVE_SESSION_ERRORS:
        //     return action.errors;
        // case RECEIVE_CURRENT_USER:
        //     return _nullErrors;
        // case CLEAR_SESSION_ERRORS:
        //     return _nullErrors;
        default:
            return state;
    }
};

export default CurrentUserReducer;