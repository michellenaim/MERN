import React from 'react';
import splash1 from "../../stylesheets/images/coins_image.png"
import splash2 from "../../stylesheets/images/table_image.jpeg"
import {Link} from 'react-router-dom'
import "../../stylesheets/main_page.scss";
import '../../stylesheets/nav_bar.scss';
// const Chart = require('chart.js');

class MainPage extends React.Component {
  
  render() {
    // const canvas = <canvas id="myChart" width="400" height="400"></canvas>
    // const ctx = document.getElementById("myChart");
    // const barChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   option: {
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     }
    //   }
    // })

    // const myDoughnutChart = new Chart(ctx, {
    //   type: 'doughnut',
    //   data: {
    //     labels: ['Home', 'Utilities', 'Food', 'Health & Fitness', 'Shopping', 'Transportation', 'Entertainment', 'Savings', 'Other'],
    //     datasets: [{
    //       data: [10, 10, 10, 10, 10, 10, 10, 10, 20]
    //     }]
    //   },
    //   options: {}
    // })

    return (
      <div className="main-page">
        {/* <div>
          {canvas}
          <script>
            {ctx}
            {barChart}
          </script>
        </div> */}

        <div className="main-first-section">
          <div className="main-first-left">
            <p>Saving money has never been so easy.</p>
            <Link className="signup-button" to={"/signup"}>Sign Up Now</Link>
          </div>

          <img src={splash2} alt="" />
        </div>

        <p className="main-about">Use budgeting app to understand your money better! Reach your goals and encourage others to reach theirs.</p>

        <div className="main-second-section">
          <img src={splash1} alt="" />

          <div className="main-second-right">
            <h1>Keep track of all your spending.</h1>
          </div>
        </div>

      </div>
    );
  }
}

export default MainPage;
