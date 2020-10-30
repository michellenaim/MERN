import React from 'react';
import TransactionIndexItem from './transaction_index_item'

class TransactionIndex extends React.PureComponent{
    constructor(props) {      
        super(props)
        this.state = { 
            selectedCategory: "All", 
            selectedTransactions: this.props.transactions, 
            date: "",
            description: "",
            category: "",
        }
        this.handleCategory = this.handleCategory.bind(this)
        this.addTransaction = this.addTransaction.bind(this)
        this.update = this.update.bind(this)
        this.renderErrors = this.renderErrors.bind(this)
    }

    // componentWillReceiveProps(nextProps, prevState) {
    //     if (!nextProps.errors.length) {
    //         this.setState({
    //             date: "",
    //             description: "",
    //             category: "",
    //         })
    //     } 
    // }

    // componentDidMount(){
    //     this.props.clearTransactionErrors();
    // }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    addTransaction(e) {
        e.preventDefault()

        let newTransaction = {
            transaction: {
                date: this.state.date,
                description: this.state.description,
                amount: Number(this.state.amount),
                category: this.state.category,
            }
        }
        this.props.createTransaction(newTransaction)
        //resetting placeholders:
        document.querySelector('.transaction-input1').value = '';
        document.querySelector('.transaction-input2').value = '';
        document.querySelector('.transaction-input3').value = '';
        document.querySelector('.transaction-input4').value = 'Select Budget Category';
        // this.props.clearTransactionErrors();
        // this.setState({
        //     date: "",
        //     description: "",
        //     category: "",
        // })
    }

    handleCategory(type) {
        return (e) => {
            e.preventDefault()
            this.setState({ selectedCategory: type})
        }
    }

    renderErrors() {
        if (!this.props.errors[2]) {
            return null
        } else {
            return (
                <ul className="transaction-errors">
                    {this.props.errors[2].data.errors.map((error, idx) => {
                        return <li key={idx}>{error.msg}</li>
                    })}
                </ul>
            )
        }
    }

    render() {
        if (!this.props.transactions.data) {
            return null
        }

        let transactionsData

        if (!this.props.transactions.data.transactions.length) {
            transactionsData = (
                <tr className="no-transactions">
                    <td colspan="5">No transactions yet!</td>
                </tr>
            )
        } else {
            transactionsData = this.props.transactions.data.transactions.map(transaction => {
                return <TransactionIndexItem key={transaction._id} transaction={transaction} editTransaction={this.props.editTransaction} deleteTransaction={this.props.deleteTransaction} />
            })
        }

        return (
            <div className="transactions">
                <p className="transaction-title">Add a Transaction</p>
                <div className="add-transaction">
                    <input onChange={this.update('date')} className="transaction-input1" type="date" name="" required/>
                    <input onChange={this.update('description')} className="transaction-input2" type="text" placeholder="Description" required/>
                    <input onChange={this.update('amount')} className="transaction-input3" type="number" placeholder="$ Amount" required/>
                    <select onChange={this.update('category')} className="transaction-input4" name="Budgets">
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

                <div>{this.renderErrors()}</div>

                <p className="transaction-title">Transactions</p>
                <div className="transaction-category-buttons">
                    <button onClick={this.handleCategory("All")} className="selected">All</button>
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
                        
                        {transactionsData}

                    </table>
                </div>
            </div>
        )
    }
}

export default TransactionIndex;