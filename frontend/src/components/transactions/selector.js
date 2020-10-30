const selectTransactionsByCategory = (transactions, category) => {
    debugger
    return Object.values(transactions).filter((transaction) => {
        return transaction.category === category
    })
}

export default selectTransactionsByCategory