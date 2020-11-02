import React from 'react';
import { Link } from 'react-router-dom';
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
      let buttons
      
    if (this.props.location.pathname !== "/login" && this.props.location.pathname !== "/signup") {
        buttons = (
          <div>
            <Link className="login-button" to={"/signup"}>Signup</Link>
            <Link className="login-button" to={"/login"}>Login</Link>
          </div>
        )
      } else if (this.props.location.pathname !== "/login") {
        buttons = <Link className="login-button" to={"/login"}>Login</Link>
      } else if (this.props.location.pathname !== "/signup") {
        buttons = <Link className="login-button" to={"/signup"}>Signup</Link>
      } 

      if (this.props.loggedIn) {
        return (
          <div className="nav-bar">
            <div>
              <Link className="logo" to="/">
                <img className="logo-img" src={logo} alt="" />
                <p>Making Cent$</p>
              </Link>
            </div>
            <div>
              <Link className="dashboard-button" to="/dashboard">Dashboard</Link>
              <button className="login-button" onClick={this.logoutUser}>
                Logout
              </button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="nav-bar">
            <div>
              <Link className="logo" to="/">
                <img className="logo-img" src={logo} alt="" />
                <p>Making Cent$</p>
              </Link>
            </div>
            <div className="nav-right">
              {buttons}
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