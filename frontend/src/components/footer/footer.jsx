import React from 'react';
import github_gray from "../../stylesheets/images/github_gray.png";

class Footer extends React.Component {

  render() {
    return (
      <div className="footer">
        <div className="footer-about-us">
          <a className="footer-github" href="https://github.com/michellenaim/MERN">
            <img src={github_gray} alt=""/>
          </a>
          <div className="footer-names">by Aishwarya Nair, Lili Gevorkian, Michelle Naim, Michael Castanieto</div>
        </div>


        <div className="footer-logo">
          <h1>Making Cent$</h1>
        </div>
      </div>
    );
  }
}

export default Footer;