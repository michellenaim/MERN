import axios from 'axios';

export const fetchAllUsers = () => {
    return axios.get('/api/users/all')
}

export const fetchCurrentUser = () => {
    return axios.get('/api/users/current')
}
