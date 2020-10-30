import { RECEIVE_USER } from "../actions/users_actions";

const CurrentUserReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER:
            return action.currentUser;
        default:
            return state;
    }
};

export default CurrentUserReducer;
