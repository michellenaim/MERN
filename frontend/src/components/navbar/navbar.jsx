import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/nav_bar.scss';
import logo from "../../stylesheets/images/logo.png";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
          <div className="nav-bar">
            <div className="logo" >
              <Link to="/">
                <img className="logo-img" src={logo} alt="" />
              </Link>
              <p>Budgeting App</p>
            </div>
            <button className="login-button" onClick={this.logoutUser}>
              Logout
            </button>
          </div>
        );
      } else {
        return (
          <div className="nav-bar">
            <div className="logo" >
              <Link to="/">
                <img className="logo-img" src={logo} alt="" />
              </Link>
                <p>Budgeting App</p>
            </div>
            <div className="nav-right">
              {this.props.history.location.pathname !== "/login" &&
                this.props.history.location.pathname !== "/signup" && (
                  <div>
                    <Link className="login-button" to={"/signup"}>Signup</Link>
                    <Link className="login-button" to={"/login"}>Login</Link>
                  </div>
                )}
            </div>
          </div>
        );
      }
  }

  render() {
      return (
        <div>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;