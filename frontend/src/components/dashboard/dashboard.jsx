import React from 'react';
import PolarGraphContainer from "../graphs/polar_graph_container"
import TransactionIndexContainer from "../transactions/transaction_index_container"
import { Link } from "react-router-dom";
import DoughnutGraph from '../graphs/doughnut_graph';

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
    }       

    componentDidMount() {     
        this.props.fetchAllTransactions()
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
                    <DoughnutGraph />
                    </div>
                </div>
              </div>

              <div className="graph-text-wrapper">
                <div className="graph-left-wrapper">
                  <div className="graph-left">
                    <PolarGraphContainer />
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