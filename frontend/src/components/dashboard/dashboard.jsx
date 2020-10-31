import React from 'react';
import PolarGraphContainer from "../graphs/polar_graph_container"
import TransactionIndexContainer from "../transactions/transaction_index_container"
import { Link } from "react-router-dom";
import { fetchBudgetBreakdown } from '../../util/budget_api_util';

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            incomeLeft: 0,
            transactionPercentages: []
        }
        this.calculatePercentages = this.calculatePercentages.bind(this);
    }       

    componentDidMount() {
        this.props.fetchAllTransactions()
            .then(() => this.props.fetchBudgetBreakdown())
            .then(() => this.setState())
            .then(() => this.calculatePercentages())
    }

    calculatePercentages() {
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
        this.props.transactions.transactions.map(transaction => {
            transactionTotals[transaction.category] += transaction.amount;
        })
        let transactionPercentages = [];
        this.props.budgetBreakdown.budgetBreakdown.map(breakdown => {
            let transactionTotal = transactionTotals[breakdown.category];
            let incomeSplit = breakdown.incomeSplit;
            // set transaction percentage to 100% if transactionTotal exceeds income split
            if (transactionTotal > incomeSplit) {
                incomeSplit = transactionTotal;
            }
            // avoid divide by zero error 
            if (incomeSplit === 0) {
                incomeSplit = 1;
                transactionTotal = 1;
            }
            let transactionPercentage = Math.round((transactionTotal/incomeSplit)*100);
            transactionPercentages.push(transactionPercentage);
        })
        this.setState({ transactionPercentages });
    }

    render () {
        return(
            <div className="dashboard">
                <p className="welcome">Welcome, {this.props.firstname}!</p>
                <div className="edit-budget-buttonarea">
                    <Link className="edit-budget-button" to={`/budget/edit`}>Edit Budget Split</Link>
                </div>
                <PolarGraphContainer transactionPercentages={this.state.transactionPercentages} incomeLeft={this.state.incomeLeft}/>
                <TransactionIndexContainer calculatePercentages={this.calculatePercentages}/>
            </div>
        )
    }
}

export default Dashboard;