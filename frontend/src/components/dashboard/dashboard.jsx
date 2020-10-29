import React from 'react';
import Graph from "../graph/graph"
import Transactions from "../transactions/transactions"

class Dashboard extends React.Component{
    // constructor(props) {
    //         super(props);
    // }       

    render () {
        return(
            <div className="dashboard">
                <p className="welcome">Welcome, User!</p>
                <div className="edit-budget">
                    <button className="edit-budget-button">Edit Budget Split</button>
                </div>
                <Graph />
                <Transactions />
            </div>
        )
    }
}

export default Dashboard;