import React from 'react'
import Chart from "chart.js";
import classes from "./polar_graph.module.css";
import '../../stylesheets/fonts.scss'
Chart.defaults.global.defaultFontFamily = "'Helvetica', sans-serif;"
// Chart.defaults.global.legend.display = false; //if we don't want to display the legend


class PolarGraph extends React.Component {
    constructor(props) {
        
        super(props)
        this.state = {
            incomeLeft: 0,
            transactionPercentages: []
        }
        

        this.calculatePercentages = this.calculatePercentages.bind(this);
    }

    chartRef = React.createRef();
  
    componentDidMount() {
        
        this.props.fetchAllTransactions()
        this.props.fetchBudgetBreakdown()
        // .then(() => this.calculatePercentages())
            
        const myChartRef = this.chartRef.current.getContext("2d");
        // const data = array that contains this.currentPercentages
        const data = Object.values(this.state.transactionPercentages)

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
        // debugger
        // this.props.fetchAllTransactions()
        // this.props.fetchBudgetBreakdown()
        // .then(() => this.calculatePercentages())

        // this.chart.data.datasets[0].data = Object.values(this.state.transactionPercentages);
        // this.chart.update();
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
            let transactionPercentage = Math.round((transactionTotal / incomeSplit) * 100);
            transactionPercentages.push(transactionPercentage);
        })
        this.setState({ transactionPercentages });
    }

    render() {
        return (
            <div className="graphpage">
                <div className={classes.polarGraphContainer}>
                    <h1>Total Amount Left for the Month: $500</h1>
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