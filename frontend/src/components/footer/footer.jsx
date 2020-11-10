import React from 'react';
import github_gray from "../../stylesheets/images/github_gray.png";

class Footer extends React.Component {

  render() {
    return (
      <div className="footer">
        <div className="footer-about-us">
          <a
            className="footer-github"
            href="https://github.com/michellenaim/making-cents"
            target="_blank"
          >
            <img src={github_gray} alt="" />
          </a>
          <div className="footer-names">
            by&nbsp;
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/aishwarya-nair22/"
              target="_blank"
            >
              Aishwarya Nair
            </a>
            ,&nbsp;
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/liligevorkian/"
              target="_blank"
            >
              Lili Gevorkian
            </a>
            ,&nbsp;
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/michellenaim/"
              target="_blank"
            >
              Michelle Naim
            </a>
            ,&nbsp;
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/mcastanieto/"
              target="_blank"
            >
              Michael Castanieto
            </a>
          </div>
        </div>

        <div className="footer-logo">
          <h1>Making Cent$</h1>
        </div>
      </div>
    );
  }
}

export default Footer;