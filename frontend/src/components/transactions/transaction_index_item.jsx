import React from 'react'

class TransactionIndexItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const transaction = this.props.transaction
        return(
            <tr>
                <td>{transaction.date}</td>
                <td>{transaction.description}</td>
                <td>79</td>
                <td>{transaction.category}</td>
                <div className="edit-delete-buttons">
                    <button><i className="fas fa-edit"></i></button>
                    <button><i className="far fa-trash-alt"></i></button>
                </div>
            </tr> 
        )
    }

}

export default TransactionIndexItem