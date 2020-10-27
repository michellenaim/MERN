import React from 'react';
import coinsimage from "../../stylesheets/images/coins_image.png"
import {Link} from 'react-router-dom'
import "../../stylesheets/main_page.scss";
import '../../stylesheets/nav_bar.scss';

class MainPage extends React.Component {
  render() {
    return (
      <div className="main-page">
        <div className="main-first-section">
          <div className="main-first-left">
            <p>Saving money has never been so easy.</p>
            <Link className="login-button" to={"/signup"}>
              Sign Up Now
            </Link>
          </div>

          <img src={coinsimage} alt="" />
        </div>

        <div className="main-second-section">
          <img src={coinsimage} alt="" />

          <div className="main-second-right">
            <h1>Keep track of all your spending.</h1>
            <p></p>
          </div>
        </div>

      </div>
    );
  }
}

export default MainPage;
