import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
        errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  componentWillMount() {
    this.props.clearErrors()
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
 
    this.props.signup(this.state)
  }

  loginDemoUser(e) {
    e.preventDefault()
    const demoUser = {
      email: "demouser@email.com",
      password: "password"
    }

    this.props.login(demoUser);
  }


  render() {

    if (this.props.errors) {
      this.props.errors.map((error, idx) => {
        return <ul className="popup-errors" key={idx}>{error}</ul>;
      });
    }

    const printErrors = (error) => {
      if (this.props.errors.includes(error)) {
        return (
          <ul className="popup-errors">
            {error}
          </ul>
        );
      }
    }

    return (
      <div className="session-background-wrapper">
        <div className="session-background">
          <div className="signup-wrapper">
            <form className="signup" onSubmit={this.handleSubmit}>
              <div className="session-text">
                <p>Sign up to start saving!</p>
                <div className="input-text-wrapper">
                  <input type="text"
                    className="input-text"
                    value={this.state.firstname}
                    onChange={this.update('firstname')}
                    placeholder="First name"
                  />
                  {printErrors("First name field is required")}
                  <input type="text"
                   className="input-text"
                    value={this.state.lastname}
                    onChange={this.update('lastname')}
                    placeholder="Last name"
                  />
                  {printErrors("Last name field is required")}
                  <input type="text"
                   className="input-text"
                    value={this.state.email}
                    onChange={this.update('email')}
                    placeholder="Email"
                  />
                  {printErrors("A user is already registered with that email")}
                  {printErrors("Email field is required")}
                  {printErrors("Email is invalid")}
                  <input type="password"
                   className="input-text"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Password"
                  />
                  {printErrors("Password field is required")}
                  {printErrors("Password must be at least 6 characters")}
                  <input type="password"
                   className="input-text"
                    value={this.state.password2}
                    onChange={this.update('password2')}
                    placeholder="Confirm password"
                  />
                  {printErrors("Confirm password field is required")}
                  {printErrors("Passwords must match")}
                  <div className="session-button-wrapper">
                    <input className="session-button" type="submit" value="Sign Up" />
                  </div>
                </div>
                  <div className="demo-user-text">
                  Just exploring? Login as a 
                  <div className="demo-user-button" onClick={this.loginDemoUser}>
                    demo user                   
                  </div>
                </div>
              </div>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);