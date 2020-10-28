import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    this.setState({errors: nextProps.errors})
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

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user); 
  }
  
  loginDemoUser(e) {
    e.preventDefault()
    const demoUser = {
      email: "testuser@email.com",
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
          <div className="login-wrapper">
            <form className="login" onSubmit={this.handleSubmit}>
              <div className="session-text">
                <p>Welcome back!</p>
                <div className="input-text-wrapper">
                    <input type="text"
                    className="input-text"
                      value={this.state.email}
                      onChange={this.update('email')}
                      placeholder="Email"
                    />
                    {printErrors("Email is invalid")}
                    {printErrors("Email field is required")}
                    {printErrors("There is no account with this email")}
                    <input type="password"
                    className="input-text"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Password"
                    />
                    {printErrors("Password field is required")}
                    {printErrors("Incorrect password")}
                </div>
                <div className="session-button-wrapper">
                  <input className="session-button" type="submit" value="Login" />
                </div>
              </div>

                <div className="demo-user-text">
                  Just exploring? Login as a 
                  <div className="demo-user-button" onClick={this.loginDemoUser}>
                    demo user                   
                  </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);