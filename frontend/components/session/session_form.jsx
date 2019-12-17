import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
      <div className="session-form-wrapper">
        <h2 className="text-center">{formString}</h2>
      <Form onSubmit={this.handleSubmit}>
        {errors.map((error, idx) => <p key={idx}>{error}</p>)}
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={this.handleInput('username')}
            value={this.state.username}
          />
        </Form.Group>
          {formType == 'signup' ?
          <Form.Group>
            <Form.Control
                type="email"
                placeholder="Email"
                onChange={this.handleInput('email')}
                value={this.state.email}
              />
            </Form.Group>
            :
            ""
          }
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={this.handleInput('password')}
            value={this.state.password}
          />
        </Form.Group>
        <Button variant="primary" block type="submit">
          {formString}
        </Button>
      </Form>
        <div className="text-center">
          {formType == 'login' ?
            <Link className="btn" to="/signup">Don't have an account? Sign Up</Link> :
            <Link className="btn" to="/login">Have an account? Log In</Link>
          }
        </div>

        {/* <h2>{formString}</h2>
        {errors.map((error, idx) => <p key={idx}>{error}</p>)}
        <form onSubmit={this.handleSubmit}>
          <label>Username
            <input
              type="text"
              onChange={this.handleInput('username')}
              value={this.state.username}
            />
          </label>
          {formType == 'signup' ?
            <label>Email
            <input
                type="text"
                onChange={this.handleInput('email')}
                value={this.state.email}
              />
            </label>
             :
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
        </form> */}

        {/* <div>
          {formType == 'login' ?
            <Link className="btn" to="/signup">Sign Up</Link> :
            <Link className="btn" to="/login">Log In</Link>
          }
        </div> */}

      </div>



    );
  }
}

export default SessionForm;