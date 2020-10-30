import React from 'react';
import TransactionIndexItem from './transaction_index_item'

class TransactionIndex extends React.Component{
    constructor(props) {
        super(props)
        // this.state = { selectedCategory: "All", selectedTransactions: this.props.transactions }
        this.handleCategory = this.handleCategory.bind(this)
        this.addTransaction = this.addTransaction.bind(this)
    }

    // componentDidMount() {
    //     this.props.fetchAllTransactions()
    // }

    addTransaction(e) {
        e.preventDefault()
        // this.props.createTransaction()
    }

    handleCategory(type) {
        return (e) => {
            e.preventDefault()
            this.setState({ selectedCategory: type})
        }
    }

    render() {
        debugger
        if (!this.props.transactions.data) {
            return null
        }

        return (
            <div className="transactions">
                <p className="transaction-title">Add a Transaction</p>
                <div className="add-transaction">
                    <input className="transaction-input" type="date" name="" required/>
                    <input className="transaction-input" type="text" placeholder="Description" required/>
                    <input className="transaction-input" type="number" placeholder="$ Amount" required/>
                    <select className="transaction-input" name="Budgets">
                        <option value="Select Budget Category" disabled selected required>Select Budget Category</option>
                        <option value="Home">Home</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Health & Fitness">Health & Fitness</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Savings">Savings</option>
                        <option value="Other">Other</option>
                    </select>
                    <button onClick={this.addTransaction} className="transaction-button">Add Transaction</button>
                </div>

                <p className="transaction-title">Transactions</p>
                <div className="transaction-category-buttons">
                    <button onClick={this.handleCategory("All")}>All</button>
                    <button onClick={this.handleCategory("Home")}>Home</button>
                    <button onClick={this.handleCategory("Utilities")}>Utilities</button>
                    <button onClick={this.handleCategory("Food")}>Food</button>
                    <button onClick={this.handleCategory("Transportation")}>Transportation</button>
                    <button onClick={this.handleCategory("Health & Fitness")}>Health & Fitness</button>
                    <button onClick={this.handleCategory("Shopping")}>Shopping</button>
                    <button onClick={this.handleCategory("Entertainment")}>Entertainment</button>
                    <button onClick={this.handleCategory("Savings")}>Savings</button>
                    <button onClick={this.handleCategory("Other")}>Other</button>
                </div>

                <div className="table">
                    <table className="transactions-table">
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Budget Category</th>
                            <th>Edit or Delete</th>
                        </tr>

                        {this.props.transactions.data.transactions.map(transaction => {
                            return <TransactionIndexItem key={transaction._id} transaction={transaction} editTransaction={this.props.editTransaction} deleteTransaction={this.props.deleteTransaction} />
                        })}

                    </table>
                </div>
            </div>
        )
    }
}

export default TransactionIndex;