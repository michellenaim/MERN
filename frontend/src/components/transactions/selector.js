const selectTransactionsByCategory = (transactions, category) => {
    return Object.values(transactions).filter((transaction) => {
        return transaction.category === category
    })
}

export default selectTransactionsByCategory