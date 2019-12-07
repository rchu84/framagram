import React from 'react';
import { Link } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user)
      .then(() => this.props.history.push('/'));
  }

  render() {
    const { formType, errors } = this.props;
    const formString = formType == 'login' ? 'Login' : 'Sign Up';
    return (
      <div>
        <h2>{formString}</h2>
        {errors.map((error, idx) => <p key={idx}>{error}</p>)}
        <form onSubmit={this.handleSubmit}>
          <label>Email
            <input
              type="text"
              onChange={this.handleInput('email')}
              value={this.state.email}
            />
          </label>
          {formType == 'signup' ?
            <label>Username
            <input
                type="text"
                onChange={this.handleInput('username')}
                value={this.state.username}
              />
            </label> :
            ""
          }
          <label>Password
            <input
              type="password"
              onChange={this.handleInput('password')}
              value={this.state.password}
            />
          </label>
          <button type="submit">{formString}</button>
        </form>

        <div>
          {formType == 'login' ?
            <Link className="btn" to="/signup">Sign Up</Link> :
            <Link className="btn" to="/login">Log In</Link>
          }
        </div>

      </div>
    );
  }
}

export default SessionForm;