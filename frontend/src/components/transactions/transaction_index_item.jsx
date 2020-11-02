import React from 'react';
import NotificationSystem from 'react-notification-system';

class TransactionIndexItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {   
            _id: this.props.transaction._id,
            date: this.props.transaction.date,
            description: this.props.transaction.description,
            category: this.props.transaction.category,
            amount: this.props.transaction.amount,

            editable: false
        }
        
        this.editTransaction = this.editTransaction.bind(this)
        this.deleteTransaction = this.deleteTransaction.bind(this)
        this.update = this.update.bind(this)
        this.showUpdateRow = this.showUpdateRow.bind(this)
        this.renderTransErrors = this.renderTransErrors.bind(this)
        this.isEditable = this.isEditable.bind(this)
        this.amountUsedAllocated = this.amountUsedAllocated.bind(this)
    }
    
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    notificationSystem = React.createRef();

    addNotification = () => {
    //   event.preventDefault();
      const notification = this.props.notification.current;
      notification.addNotification({
        title: 'Warning!',
        message: 'You have exceeded your budget set for this category',
        level: 'error',
      });
    };

    amountUsedAllocated(category) {
        let transactionTotals = {
            'Home': 0,
            'Utilities': 0,
            'Food': 0,
            'Transportation': 0,
            'Health & Fitness': 0,
            'Shopping': 0,
            'Entertainment': 0,
            'Savings': 0,
            'Other': 0
        }
        this.props.transactions.forEach(transaction => {
            transactionTotals[transaction.category] += transaction.amount;
        })
        let res = false
        
        this.props.currentUser.budgetBreakdown.forEach(breakdown => {
            if( transactionTotals[breakdown.category] > breakdown.incomeSplit && breakdown.category === category) {
                res = true
            }
        })
        return res
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
        .then(() => {
            this.setState({
                editable: false
            })
        })
        .then(() => {
            if (this.amountUsedAllocated(updatedTransaction.category) === true) {
                this.addNotification()
            }
        })
    }
            
    deleteTransaction(e) {
        e.preventDefault()      
        
        this.props.deleteTransaction(this.props.transaction)       
    }
            
    renderTransErrors() {
        if (!this.props.errors[2]) {
            return null
        } else if (!this.state.editable) {
            return null
        } else {
            return (
                <td colspan="5" className="update-transaction-errors" >
                    <ul>
                        {this.props.errors[2].data.errors.map((error, idx) => {
                            return <li key={idx}>{error.msg}</li>
                        })}
                    </ul>               
                </td>
            )
        }
    }

    showUpdateRow(e) {
        e.preventDefault()

        if (!this.state.editable) {
            this.setState({editable: true})
        } else {
            this.setState({editable: false})
        }
    }

    isEditable() {
        if (this.state.editable) {
            return (
                <tr className="edit-transaction-border">
                    <div>
                        <NotificationSystem ref={this.notificationSystem} />
                    </div>
                    <td className="date-column"><input className="transaction-input1" onChange={this.update('date')} type="date" name="" value={this.state.date.toString().slice(0, 10)} required /></td>
                    <td className="description-column"><input className="transaction-input2" onChange={this.update('description')} type="text" placeholder="Description" value={this.state.description} /></td>
                    <td className="amount-column"><input className="transaction-input3" onChange={this.update('amount')} type="number" placeholder="$ Amount" value={this.state.amount} required /></td>
                    <td className="budget-column"><select className="transaction-input4" onChange={this.update('category')} name="Budgets" value={this.state.category}>
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
                    <td className="edit-column"><button onClick={this.editTransaction} className="edit-transaction-button">Update Transaction</button></td>
                </tr>               
            )
        } else {
            return null
        }
    }

    render() {

        const transaction = this.props.transaction

        return(
            <React.Fragment>
                <tr>
                    <td className="date-column" >{transaction.date.toString().slice(0, 10)}</td>
                    <td className="description-column">{transaction.description}</td>               
                    <td className="amount-column">${transaction.amount}</td>
                    <td className="budget-column">{transaction.category}</td>
                    <div className="edit column edit-delete-buttons">
                        <button onClick={this.showUpdateRow} ><i className="fas fa-edit"></i></button>
                        <button onClick={this.deleteTransaction} ><i className="far fa-trash-alt"></i></button>
                    </div>
                </tr> 
                
                {this.isEditable()}

                {this.renderTransErrors()}

            </React.Fragment>
        )
    }

}

export default TransactionIndexItem