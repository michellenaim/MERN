import React from 'react';
import Graph from "../graph/graph"

class Dashboard extends React.Component{
    // constructor(props) {
    //         super(props);
    // }       

    render () {
        return(
            <div className="dashboard">
                <p className="welcome">Welcome, User!</p>
                <button className="transaction-button">Edit Budget Split</button>
                <Graph />
                <p className="transaction-title">Add a transaction</p>
                <div className="add-transaction">
                    <input type="date" name="" required/>
                    <input type="text" placeholder="Description" required/>
                    <input type="number" placeholder="$ Amount" required/>
                    <select name="Budgets">
                        <option value="Select Budget Category" disabled selected required>Select Budget Category</option>
                        <option value="Home">Home</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Health & Fitness">Health & Fitness</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Savings">Savings</option>
                        <option value="Other">Other</option>
                    </select>
                    <button className="transaction-button">Add Transaction</button>
                </div>
                <p className="transaction-title">Transactions</p>
                <table className="transactions-table">
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount in $</th>
                        <th>Budget Category</th>
                    </tr>
                    <tr>
                        <td>06/02/2020</td>
                        <td>Groceries from WholeFoods</td>
                        <td>79</td>
                        <td>Food</td>
                    </tr>
                    <tr>
                        <td>06/02/2020</td>
                        <td>Groceries from WholeFoods</td>
                        <td>79</td>
                        <td>Food</td>
                    </tr>
                    <tr>
                        <td>06/02/2020</td>
                        <td>Groceries from WholeFoods</td>
                        <td>79</td>
                        <td>Food</td>
                    </tr>
                    <tr>
                        <td>06/02/2020</td>
                        <td>Groceries from WholeFoods</td>
                        <td>79</td>
                        <td>Food</td>
                    </tr>
                    <tr>
                        <td>06/02/2020</td>
                        <td>Groceries from WholeFoods</td>
                        <td>79</td>
                        <td>Food</td>
                    </tr>
                    <tr>
                        <td>06/02/2020</td>
                        <td>Groceries from WholeFoods</td>
                        <td>79</td>
                        <td>Food</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default Dashboard;