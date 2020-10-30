import React from 'react';
import PolarGraphContainer from "../graphs/polar_graph_container"
import TransactionIndexContainer from "../transactions/transaction_index_container"

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
    }       

    componentDidMount() {
        this.props.fetchAllTransactions()
    }

    render () {
        return(
            <div className="dashboard">
                <p className="welcome">Welcome, {this.props.firstname}!</p>
                <div className="edit-budget-buttonarea">
                    <button className="edit-budget-button">Edit Budget Split</button>
                </div>
                <PolarGraphContainer />
                <TransactionIndexContainer />
            </div>
        )
    }
}

export default Dashboard;