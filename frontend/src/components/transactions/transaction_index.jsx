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
        .then(() => this.props.clearTransactionErrors())
        .then(() => {
            this.setState({
                date: "",
                description: "",
                category: "", //not working
                amount: "empty"
            })
            document.querySelector('.transaction-input4').value = 'Select Budget Category';
        })
        
        //resetting placeholders:
        // document.querySelector('.transaction-input1').value = '';
        // document.querySelector('.transaction-input2').value = '';
        // document.querySelector('.transaction-input3').value = '';
    }

    handleCategory(type) {
        return (e) => {
            e.preventDefault()
            // this.setState({ selectedCategory: type})
            this.props.fetchFilteredTransactions(type)

            const CATEGORY_KEYS = ["Home", "Utilities", "Savings", "Food", "Other",
                    "Health & Fitness", "Shopping", "Transportation",
                    "Entertainment"];
            CATEGORY_KEYS.forEach((category) => {
                if (type === category) {
                    this.setState({
                        [type]: "selected"
                    })
                } else{
                    this.setState({
                        [category]: '',
                        All : ''
                    })
                }
            }) 

            if (type === "/") {
                this.setState({
                    All: "selected"
                })
            }
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
        let noTransactionsInCategory
        let sortedData

        if (!this.props.transactions.data.transactions.length) {
            transactionsData = (
                <tr className="no-transactions">
                    <td colspan="5">No transactions yet!</td>
                </tr>
            )
        } else if (this.props.transactions.data.transactions.map !== undefined){
            // debugger
            sortedData = this.props.transactions.data.transactions.sort((a, b) => (a.date < b.date) ? 1 : (a.date === b.date) ? ((a.amount < b.amount) ? 1 : -1) : -1 )
            transactionsData = sortedData.map(transaction => {
                return <TransactionIndexItem key={transaction._id} errors={this.props.updateErrors} transaction={transaction} editTransaction={this.props.editTransaction} deleteTransaction={this.props.deleteTransaction} clearUpdatedTransactionErrors={this.props.clearUpdatedTransactionErrors} />
            })
        } else {
            noTransactionsInCategory = (
                <tr className="no-transactions">
                    <td colspan="5">There are no transactions in this category</td>
                </tr>
            )
        }

        return (
          <div className="transactions-wrapper">
            <div className="transactions">
                <div className="transaction-header">
                    <p>Expenditures</p>
                </div>
              <p className="transaction-title">Add a Transaction</p>
              <div className="add-transaction">
                <input
                  onChange={this.update("date")}
                  className="transaction-input1"
                  type="date"
                  name=""
                  value={this.state.date}
                  required
                />
                <input
                  onChange={this.update("description")}
                  className="transaction-input2"
                  type="text"
                  placeholder="Description"
                  value={this.state.description}
                  required
                />
                <input
                  onChange={this.update("amount")}
                  className="transaction-input3"
                  type="number"
                  placeholder="$ Amount"
                  value={this.state.amount}
                  required
                />
                <select
                  onChange={this.update("category")}
                  className="transaction-input4"
                  name="Budgets"
                >
                  <option
                    value="Select Budget Category"
                    disabled
                    selected
                    required
                  >
                    Select Budget Category
                  </option>
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
                <button
                  onClick={this.addTransaction}
                  className="transaction-button"
                >
                  Add Transaction
                </button>
              </div>

              <div>{this.renderErrors()}</div>

                <p className="transaction-title">Transactions</p>
                <div className="transaction-category-buttons">
                    <button onClick={this.handleCategory("/")} className={this.state.All}>All</button>
                    <button onClick={this.handleCategory("Home")} className={this.state.Home}>Home</button>
                    <button onClick={this.handleCategory("Utilities")} className={this.state.Utilities}>Utilities</button>
                    <button onClick={this.handleCategory("Food")} className={this.state.Food}>Food</button>
                    <button onClick={this.handleCategory("Transportation")} className={this.state.Transportation}>Transportation</button>
                    <button onClick={this.handleCategory("Health & Fitness")} className={this.state["Health & Fitness"]}>Health & Fitness</button>
                    <button onClick={this.handleCategory("Shopping")} className={this.state.Shopping}>Shopping</button>
                    <button onClick={this.handleCategory("Entertainment")} className={this.state.Entertainment}>Entertainment</button>
                    <button onClick={this.handleCategory("Savings")} className={this.state.Savings}>Savings</button>
                    <button onClick={this.handleCategory("Other")} className={this.state.Other}>Other</button>
                </div>

                <table className="transactions-table">
                    <tr>
                        <th className="date-column">Date</th>
                        <th className="description-column">Description</th>
                        <th className="amount-column">Amount</th>
                        <th className="budget-column">Budget Category</th>
                        <th className="edit-column">Edit or Delete</th>
                    </tr>
                    
                    {transactionsData}
                    {noTransactionsInCategory}

                </table>

            </div>
          </div>
        );
    }
}

export default TransactionIndex;