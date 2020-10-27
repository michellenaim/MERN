import React from 'react';
import { AuthRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container.js';
import ScrollToTop from './ScrollToTop'
import MainPage from './main_page/main_page.jsx';
import LoginFormContainer from './session/login_form_container.js';
import SignupFormContainer from './session/signup_form_container.js';
import Footer from "./footer/footer"

const App = () => (
  <div>
    <NavBarContainer />
    <ScrollToTop />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>

    <footer>
      <Footer />
    </footer> 
  </div>
);

export default App;