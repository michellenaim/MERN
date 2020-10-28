import React from 'react';
import Graph from "../graph/graph"

class Dashboard extends React.Component{
    render () {
        return(
            <div className="dashboard">
                <p>Welcome, User!</p>
                <Graph />
                <p>Add a transaction</p>
                <input type="date" name=""/>
                <input type="text" placeholder="Description"/>
                <p>$</p><input type="number"/>
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
            </div>
        )
    }
}

export default Dashboard;