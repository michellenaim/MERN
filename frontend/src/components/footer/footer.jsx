import React from 'react';
import github_blue from "../../stylesheets/images/github_blue.png";
import "../../stylesheets/footer.scss"

class Footer extends React.Component{
    render() {
        return (
            <div className="footer">
                <img src={github_blue} alt=""/>
            </div>
        )
    }
}

export default Footer;