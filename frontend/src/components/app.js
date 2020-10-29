import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import NavBarContainer from './navbar/navbar_container.js';
import ScrollToTop from './ScrollToTop'
import MainPage from './main_page/main_page.jsx';
import LoginFormContainer from './session/login_form_container.js';
import SignupFormContainer from './session/signup_form_container.js';
import BudgetEditContainer from './budget/edit_budget_form_container.js'
import Footer from "./footer/footer"
import DoughnutGraph from './graphs/doughnut_graph_container'
import PolarGraph from './graphs/polar_graph_container'

const App = () => (
  <div>
    <NavBarContainer />
    <ScrollToTop />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute exact path="/graph" component={DoughnutGraph}/>
      <ProtectedRoute exact path="/polargraph" component={PolarGraph}/>
      <ProtectedRoute exact path="/budget/edit" component={BudgetEditContainer} />
    </Switch>

    <footer>
      <Footer />
    </footer> 
  </div>
);

export default App;