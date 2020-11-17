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
            rel="noreferrer"
          >
            <img src={github_gray} alt="" />
          </a>
          <div className="footer-names">
            by&nbsp;
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/aishwarya-nair22/"
              target="_blank"
              rel="noreferrer"
            >
              Aishwarya Nair
            </a>
            ,&nbsp;
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/liligevorkian/"
              target="_blank"
              rel="noreferrer"
            >
              Lili Gevorkian
            </a>
            ,&nbsp;
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/michellenaim/"
              target="_blank"
              rel="noreferrer"
            >
              Michelle Naim
            </a>
            ,&nbsp;
            <a
              className="linkedin"
              href="https://www.linkedin.com/in/mcastanieto/"
              target="_blank"
              rel="noreferrer"
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