import axios from 'axios';

export const fetchAllTransactions = () => {
    return axios.get('/api/transactions/')
}

export const logTransaction = (transaction) => {
    return axios.post('/api/transactions/')
    // data: {transaction}
}

export const updateTransaction = (transaction) => {
    return axios.patch('/api/transactions/update')
}

export const deleteTransaction = (transaction) => {
    return axios.delete('/api/transactions/delete')
}
