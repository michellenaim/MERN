import React from 'react';
import PolarGraphContainer from "../graphs/polar_graph_container"
import TransactionIndexContainer from "../transactions/transaction_index_container"
import { Link } from "react-router-dom";
import DoughnutGraph from '../graphs/doughnut_graph';

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          budgetPercentages: {
            "Home": 0,
            "Utilities": 0,
            "Food": 0,
            "Transportation": 0,
            "Health & Fitness": 0,
            "Shopping": 0,
            "Entertainment": 0,
            "Savings": 0,
            "Other": 0,
            "Income": 0
          }
        };
    }       

    componentDidMount() {     
        this.props.fetchAllTransactions();
        this.props.fetchCurrentUser()
          .then(() => this.setBudgetPercentages())
    }

    setBudgetPercentages() {
      let { budgetPercentages } = this.state;
      let incomePercentage = 1;
      this.props.currentUser.budgetBreakdown.forEach(budget => {
        budgetPercentages[budget.category] = budget.percent;
        incomePercentage -= budget.percent;
      })
      budgetPercentages.Income = incomePercentage;
      this.setState({budgetPercentages})
    }

    render () {
        return (
          <div className="dashboard">
            <div className="top-dashboard-wrapper">
              <p className="welcome">Welcome, {this.props.firstname}!</p>
              <div className="dashboard-doughnut-graph-wrapper">
                <div className="doughnut-card-wrapper">
                    <div className="doughnut-card-text-wrapper">
                        <p className="doughnut-header-text">How You've Split Up Your Income</p>
                        <div className="edit-budget-buttonarea">
                            <Link className="edit-budget-button" to={`/budget/edit`}>
                            Update
                            </Link>
                        </div>
                    </div>
                    <div className="dashboard-doughnut-graph">
                    <DoughnutGraph currentPercentages={this.state.budgetPercentages} />
                    </div>
                </div>
              </div>

              <div className="graph-text-wrapper">
                <div className="graph-left-wrapper">
                  <div className="graph-left">
                    <PolarGraphContainer fetchAllTransactions={this.props.fetchAllTransactions} transactions={this.props.transactions} />
                  </div>
                </div>
                <div className="text-right">
                  <div className="dashboard-blurb-wrapper">
                    <div className="dashboard-text">
                      <p className="text-header">Staying on track?</p>
                      <p className="text-body">
                        Log your transactions below and we'll take care of the
                        rest! Keeping you up to date on your spending habits
                        every day!
                      </p>
                    </div>
                    <div className="dashboard-image">
                      <img
                        height="250px"
                        width="250px"
                        src="https://www.easybudgetblog.com/wp-content/uploads/2019/06/GettingStarted_Budgets.jpg"
                        alt=""
                      ></img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-transactions-wrapper">
              <TransactionIndexContainer />
            </div>
          </div>
        );
    }
}

export default Dashboard;