import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Alert from "react-bootstrap/Alert";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { withRouter } from "react-router-dom";
import { loginUser } from "../actions";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    email: "",
    password: "",
    showAlert: false
  };

  handleChange = event => {
    const inputType = event.target.name;
    this.setState({
      [inputType]: event.target.value
    });
  };

  alertCallback = _ => {
    this.setState({ showAlert: true });
  };

  render() {
    return (
      <div className="login-background">
        <Container id="login-white-background">
          <Alert
            show={this.state.showAlert}
            variant="danger"
            dismissible
            onClose={_ => this.setState({ showAlert: false })}
          >
            Invalid email or password.
          </Alert>

          <Row>
            <Col>
              <br />
              <h1 className="logo">Running Mate</h1>
              <br />
              <h2>Sign In</h2>
              <br />
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.dispatch(
                    loginUser(
                      {
                        email: this.state.email,
                        password: this.state.password
                      },
                      this.props.history,
                      this.alertCallback
                    )
                  );
                }}
              >
                <Form.Group>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </Form.Group>
                <br />
                <Form.Group>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </Form.Group>
                <br />

                <Button className="btn-block" variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <br />
              <h3>New User?</h3>
              <br />
              <Button onClick={_ => this.props.history.push("/sign-up")}>
                Sign up here!
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// function mdp(dispatch) {
//   return {
//     loginSubmit: (email, password, history) => {
//       loginUser(dispatch, { email, password }, history)();
//     }
//   };
// }

export default withRouter(
  connect(state => ({
    user: state.user
  }))(Login)
);
