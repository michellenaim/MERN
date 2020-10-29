import React from 'react';
import splash1 from "../../stylesheets/images/coins_image.png"
import splash2 from "../../stylesheets/images/table_image.jpeg"
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
            <Link className="signup-button" to={"/signup"}>Create New Account</Link>
          </div>

          <img src={splash2} alt="" />
        </div>

        <p className="main-about">We can help you understand your money better and effortlessly manage your savings.</p>
        {/* Reach your goals and help others achieve theirs! */}
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
