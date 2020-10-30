import React from 'react';
import TransactionIndexItem from './transaction_index_item'

class TransactionIndex extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        debugger
        this.props.fetchAllTransactions()
        debugger
    }

    render() {
        debugger
        return (
            <div className="transactions">
                <p className="transaction-title">Add a transaction</p>
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
                    <button className="transaction-button">Add Transaction</button>
                </div>

                <p className="transaction-title">Transactions</p>

                <div className="table">
                    <table className="transactions-table">
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount in $</th>
                            <th>Budget Category</th>
                            <th>Edit or Delete</th>
                        </tr>
                        {/* <tr>
                            <td>06/02/2020</td>
                            <td>Groceries from WholeFoods</td>
                            <td>79</td>
                            <td>Food</td>
                            <div className="edit-delete-buttons">
                                <button><i className="fas fa-edit"></i></button>
                                <button><i className="far fa-trash-alt"></i></button>
                            </div>
                        </tr> */}

                        {this.props.transactions.map(transaction => {
                            return <TransactionIndexItem key={transaction._id} transaction={transaction} />
                        })}
                    </table>
                </div>
            </div>
        )
    }
}

export default TransactionIndex;