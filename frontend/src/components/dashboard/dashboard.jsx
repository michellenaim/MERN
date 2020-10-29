import React from 'react';
import DoughnutGraphContainer from "../graphs/doughnut_graph_container"
import TransactionsContainer from "../transactions/transactions_container"

class Dashboard extends React.Component{
    // constructor(props) {
    //     super(props);
    // }       

    render () {
        return(
            <div className="dashboard">
                <p className="welcome">Welcome, {this.props.firstname}!</p>
                <div className="edit-budget-buttonarea">
                    <button className="edit-budget-button">Edit Budget Split</button>
                </div>
                <DoughnutGraphContainer />
                <TransactionsContainer />
            </div>
        )
    }
}

export default Dashboard;