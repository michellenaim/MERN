import React from 'react'

class TransactionIndexItem extends React.Component {
    constructor(props) {
        super(props)

        this.editTransaction = this.editTransaction.bind(this)
        this.deleteTransaction = this.deleteTransaction.bind(this)
    }

    editTransaction(e) {
        e.preventDefault()
        // this.props.addTransaction()
    }

    deleteTransaction(e) {
        e.preventDefault()
        // this.props.deleteTransaction()
    }

    render() {
        const transaction = this.props.transaction

        return(
            <tr>
                <td>{transaction.date.toString().slice(0, 10)}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.category}</td>
                <div className="edit-delete-buttons">
                    <button onClick={this.editTransaction} ><i className="fas fa-edit"></i></button>
                    <button onClick={this.deleteTransaction} ><i className="far fa-trash-alt"></i></button>
                </div>
            </tr> 
        )
    }

}

export default TransactionIndexItem