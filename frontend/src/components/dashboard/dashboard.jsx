import React from 'react';
import PolarGraphContainer from "../graphs/polar_graph_container"
import TransactionIndexContainer from "../transactions/transaction_index_container"
import { Link } from "react-router-dom";

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
                    <Link className="edit-budget-button" to={`/budget/edit`}>Edit Budget Split</Link>
                </div>
                <PolarGraphContainer />
                <TransactionIndexContainer />
            </div>
        )
    }
}

export default Dashboard;