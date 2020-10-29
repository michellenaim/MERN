import * as UserApiUtil from "../util/users_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_All_USERS = "RECEIVE_All_USERS";

export const receiveAllUsers = (users) => {
    return({
        type: RECEIVE_All_USERS,
        users
    })
}
export const receiveCurrentUser = (currentUser) => {
    return({
        type: RECEIVE_USER,
        currentUser
    })
}

export const fetchAllUsers = () => (dispatch) => {
    return UserApiUtil.fetchAllUsers()
        .then(users => dispatch(receiveAllUsers(users)))
}

export const fetchCurrentUser = () => (dispatch) => {
    return UserApiUtil.fetchCurrentUser()
        .then(currentUser => dispatch(receiveCurrentUser(currentUser)))
}
