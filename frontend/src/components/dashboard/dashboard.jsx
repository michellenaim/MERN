import React from 'react';
import PolarGraph from "../graphs/polar_graph"
import TransactionIndexContainer from "../transactions/transaction_index_container"
import { Link } from "react-router-dom";

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
    }       

    componentDidMount() {     
        this.props.fetchAllTransactions()
        .then(() => this.props.fetchBudgetBreakdown())
  
    }

    render () {
        return(
            <div className="dashboard">
                <p className="welcome">Welcome, {this.props.firstname}!</p>
                <div className="edit-budget-buttonarea">
                    <Link className="edit-budget-button" to={`/budget/edit`}>Edit Budget Split</Link>
                </div>
                <PolarGraph fetchAllTransactions={this.props.fetchAllTransactions} fetchBudgetBreakdown={this.props.fetchBudgetBreakdown} transactions={this.props.transactions} budgetBreakdown={this.props.budgetBreakdown} />
                <TransactionIndexContainer calculatePercentages={this.calculatePercentages}/>
            </div>
        )
    }
}

export default Dashboard;