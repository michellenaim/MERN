import React from 'react'
import Chart from "chart.js";
import classes from "./polar_graph.module.css";
import '../../stylesheets/fonts.scss'
Chart.defaults.global.defaultFontFamily = "'Helvetica', sans-serif;"
// Chart.defaults.global.legend.display = false; //if we don't want to display the legend


class PolarGraph extends React.Component {
    constructor(props) {
        
        super(props)

        this.transactionPercentages = [];
        this.incomeLeft = 0;
        this.state = {incomeLeft: 0};
    }

    chartRef = React.createRef();
  
    componentDidMount() {
        
        this.props.fetchCurrentUser()
            .then(() => this.props.fetchAllTransactions())
            .then(() => this.calculatePercentages())
            
        const myChartRef = this.chartRef.current.getContext("2d");

        this.chart = new Chart(myChartRef, {
            type: 'polarArea',
            data: {
                labels: ['Home', 'Utilities', 'Food', 'Transportation', 'Health & Fitness', 'Shopping', 'Entertainment', 'Savings', 'Other'],
                datasets: [{
                    data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
                    backgroundColor: [
                        'rgba(40, 147, 255, 0.3)',
                        'rgba(255, 255, 40, 0.4)',
                        'rgba(255, 40, 40, 0.3)',
                        'rgba(147, 255, 40, 0.3)',
                        'rgba(147, 40, 255, 0.2)',
                        'rgba(255, 40, 255, 0.2)',
                        'rgba(255, 147, 40, 0.4)',
                        'rgba(40, 40, 255, 0.2)',
                        'rgba(40, 255, 147, 0.2)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(40, 147, 255, 0.5)',
                        'rgba(255, 255, 40, 0.8)',
                        'rgba(255, 40, 40, 0.5)',
                        'rgba(147, 255, 40, 0.5)',
                        'rgba(147, 40, 255, 0.4)',
                        'rgba(255, 40, 255, 0.4)',
                        'rgba(255, 147, 40, 0.6)',
                        'rgba(40, 40, 255, 0.4)',
                        'rgba(40, 255, 147, 0.4)',
                    ],
                    borderColor: [
                        'rgba(40, 147, 255, 0.7)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(255, 40, 40, 0.7)',
                        'rgba(147, 255, 40, 1)',
                        'rgba(147, 40, 255, 0.6)',
                        'rgba(255, 40, 255, 0.6)',
                        'rgba(255, 147, 40, 0.8)',
                        'rgba(40, 40, 255, 0.6)',
                        'rgba(40, 255, 147, 1)',
                    ],
                    borderWidth: 0.5
                }]
            }, 
            options: {
                scale: {
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        stepSize: 20
                    }
                },
                // legend: {
                //     position: 'left'
                // },
                tooltips: {
                    displayColors: false,
                    callbacks: {
                        title: function (tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']] + ":";
                        },
                        label: function (tooltipItem, data) {
                            return data['datasets'][0]['data'][tooltipItem['index']] + "% used so far";
                        }
                    },
                    
                },
            }
        });
    }

    componentDidUpdate() {
        // only calculate when transactions and currentUser are loaded
        if (this.props.transactions && this.props.currentUser) { 
            this.calculatePercentages();
        }

        this.chart.data.datasets[0].data = Object.values(this.transactionPercentages);
        this.chart.update();
        // force a re-render to update incomeLeft after updating the graph
        if (this.state.incomeLeft !== this.incomeLeft) {
            this.setState({incomeLeft: this.incomeLeft});
        }
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
        let transactionTotal = 0;
        this.props.transactions.transactions.forEach(transaction => {
            transactionTotals[transaction.category] += transaction.amount;
            transactionTotal += transaction.amount;
        })
        this.incomeLeft = this.props.currentUser.income - transactionTotal;
        let transactionPercentages = [];
        this.props.currentUser.budgetBreakdown.forEach(breakdown => {
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
            let transactionPercentage = Math.round((transactionTotal / incomeSplit) * 100);
            transactionPercentages.push(transactionPercentage);
        })
        this.transactionPercentages = transactionPercentages;
    }

    render() {
        return (
            <div className="graphpage">
                <div className={classes.polarGraphContainer}>
                    <h1>{`Total Amount Left for the Month: $${this.state.incomeLeft}`}</h1>
                    <h2>Spending Per Category</h2>
                    <canvas
                        id="myChart"
                        ref={this.chartRef}
                    />
                </div>
            </div>
        )
    }
}

export default PolarGraph