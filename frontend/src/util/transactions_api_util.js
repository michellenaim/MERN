import axios from 'axios';

export const fetchAllTransactions = () => {
    return axios.get('/api/transactions/')
}
