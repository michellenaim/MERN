import React from 'react'
import Chart from "chart.js";
import classes from "./polar_graph.module.css";
import '../../stylesheets/fonts.scss'
Chart.defaults.global.defaultFontFamily = "'Helvetica', sans-serif;"
// Chart.defaults.global.legend.display = false; //if we don't want to display the legend


class PolarGraph extends React.Component {
    // constructor(props) {
    //   super(props)
    //   // this.currentPercentages = this.props.currentPercentages
    //   // this.totalIncome = this.props.totalIncome
    // }

    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        // const data = array that contains this.currentPercentages

        new Chart(myChartRef, {
            type: 'polarArea',
            data: {
                labels: ['Home', 'Utilities', 'Food', 'Transportation', 'Health & Fitness', 'Shopping', 'Entertainment', 'Savings', 'Other'],
                datasets: [{
                    data: [90, 80, 85, 50, 60, 95, 90, 47, 70],
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
    render() {
        return (
            <div className="graphpage">
                <div className={classes.polarGraphContainer}>
                    <h1>Amount Left: $500</h1>
                    <h1>Spending Per Category</h1>
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