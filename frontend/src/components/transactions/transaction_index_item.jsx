import React from 'react'

class TransactionIndexItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {   
            _id: this.props.transaction._id,
            date: this.props.transaction.date,
            description: this.props.transaction.description,
            category: this.props.transaction.category,
            amount: this.props.transaction.amount
        }
        
        this.editTransaction = this.editTransaction.bind(this)
        this.deleteTransaction = this.deleteTransaction.bind(this)
        this.update = this.update.bind(this)
        this.showUpdateRow = this.showUpdateRow.bind(this)
        this.renderTransErrors = this.renderTransErrors.bind(this)
    }

    showUpdateRow() {

    }

    renderTransErrors() {
        if (!this.props.errors[2]) {
            return null
        } else {
            return (
                <ul className="update-transaction-errors">
                    {this.props.errors[2].data.errors.map((error, idx) => {
                        return <li key={idx}>{error.msg}</li>
                    })}
                </ul>
            )
        }
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    editTransaction(e) {
        e.preventDefault()
        let updatedTransaction = {
            _id: this.state._id,
            date: this.state.date,
            description: this.state.description,
            category: this.state.category,
            amount: this.state.amount
        }
        
        this.props.editTransaction(updatedTransaction)
        .then(() => this.props.clearUpdatedTransactionErrors())
        // .then(() => {
        //     this.setState({
        //         date: "",
        //         description: "",
        //         category: "", //not working
        //         amount: "empty"
        //     })
        // })
    }

    deleteTransaction(e) {
        e.preventDefault()      
   
        this.props.deleteTransaction(this.props.transaction)       
    }

    render() {
        const transaction = this.props.transaction

    
        return(
            <React.Fragment>
                <tr>
                    <td>{transaction.date.toString().slice(0, 10)}</td>
                    <td>{transaction.description}</td>               
                    <td>${transaction.amount}</td>
                    <td>{transaction.category}</td>
                    <div className="edit-delete-buttons">
                        <button onClick={this.showUpdateRow} ><i className="fas fa-edit"></i></button>
                        <button onClick={this.deleteTransaction} ><i className="far fa-trash-alt"></i></button>
                    </div>
                </tr> 

                <tr className="edit-transaction-border">
                    <td><input onChange={this.update('date')} type="date" name="" value={this.state.date.toString().slice(0, 10)} required /></td>
                    <td><input onChange={this.update('description')} type="text" placeholder="Description" value={this.state.description} /></td>
                    <td><input onChange={this.update('amount')} type="number" placeholder="$ Amount" value={this.state.amount} required /></td>
                    <td><select onChange={this.update('category')} name="Budgets" value={this.state.category}>
                        <option value="Home">Home</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Health & Fitness">Health & Fitness</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Savings">Savings</option>
                        <option value="Other">Other</option>
                    </select></td>
                    <td><button onClick={this.editTransaction} className="edit-transaction-button">Update Transaction</button></td>
                </tr>
                <div colspan="5">{this.renderTransErrors()}</div>

            </React.Fragment>
        )
    }

}

export default TransactionIndexItem