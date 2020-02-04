import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import faker from 'faker';

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
    Object.keys(user).forEach(key => user[key] = user[key].toLowerCase());
    this.props.processForm(user)
      .then(() => this.props.history.push('/'));
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.clearErrors();
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { formType, errors } = this.props;
    const formString = formType == 'login' ? 'Login' : 'Sign Up';
    return (
      <div className="session-form-wrapper">
        <h2 className="text-center">Framagram</h2>
        {formType == "login" ? (
          ""
        ) : (
          <h3 className="sign-up-text">
            Sign up to see photos from your friends.
          </h3>
        )}
        <Form onSubmit={this.handleSubmit}>
          {errors.map((error, idx) => (
            <p className="session-errors text-center" key={idx}>
              {error}
            </p>
          ))}
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={this.handleInput("username")}
              value={this.state.username}
            />
          </Form.Group>
          {formType == "signup" ? (
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={this.handleInput("email")}
                value={this.state.email}
              />
            </Form.Group>
          ) : (
            ""
          )}
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={this.handleInput("password")}
              value={this.state.password}
            />
          </Form.Group>
          <Button variant="primary" block type="submit">
            {formString}
          </Button>
          {formType == "login" ? (
            <Button
              variant="secondary"
              block
              type="submit"
              onClick={() =>
                this.setState({
                  username: "abc",
                  password: "123456"
                })
              }
            >
              DEMO LOGIN
            </Button>
          ) : (
            <Button
              variant="secondary"
              block
              type="submit"
              onClick={() =>
                this.setState({
                  username: faker.internet.userName(),
                  password: "123456",
                  email: faker.internet.email()
                })
              }
            >
              DEMO ACCOUNT
            </Button>
          )}
        </Form>
        <div className="text-center align-middle">
          {formType == "login" ? (
            <Link className="btn" to="/signup">
              Don't have an account?<br></br>
              <span style={{ color: "#3897f0" }}>Sign Up</span>
            </Link>
          ) : (
            <Link className="btn" to="/login">
              Have an account? <span style={{ color: "#3897f0" }}>Log In</span>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default SessionForm;