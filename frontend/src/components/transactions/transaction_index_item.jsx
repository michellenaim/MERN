import React from 'react'

class TransactionIndexItem extends React.Component {
    constructor(props) {
        super(props)
        // this.props.editTransaction(transaction)
        this.state = {
            transaction: {
                date: "",
                description: "test",
                category: "Savings",
                amount: 120
            }
        }

        this.editTransaction = this.editTransaction.bind(this)
        this.deleteTransaction = this.deleteTransaction.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.update = this.update.bind(this)
    }

    handleChange(type) {
        return (e) => {
            e.preventDefault()
            this.setState
        }
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    editTransaction(e) {
        e.preventDefault()
        this.props.editTransaction(this.state.transaction)
    }

    deleteTransaction(e) {
        e.preventDefault()      
    
        this.props.deleteTransaction(this.props.transaction)       
    }

    render() {
        const transaction = this.props.transaction

        return(
            <tr>
                <td>{transaction.date.toString().slice(0, 10)}</td>
                <td>{transaction.description}</td>               
                <td>${transaction.amount}</td>
                <td contenteditable='true'>{transaction.category}</td>
                <div className="edit-delete-buttons">
                    <button onClick={this.editTransaction} ><i className="fas fa-edit"></i></button>
                    <button onClick={this.deleteTransaction} ><i className="far fa-trash-alt"></i></button>
                </div>
            </tr> 
        )
    }

}

export default TransactionIndexItem