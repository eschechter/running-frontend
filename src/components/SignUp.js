import React, { Component } from "react";
import { signUp } from "../actions.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    formSubmitted: false,
    showAlert: false
  };

  isStateValid = () => {
    return this.state.name && this.state.email && this.state.password;
  };

  alertCallback = _ => {
    this.setState({ showAlert: true });
  };

  enableCallback = () => {
    this.setState({ formSubmitted: false });
  };

  handleChange = event => {
    const inputType = event.target.name;
    this.setState({
      [inputType]: event.target.value
    });
  };

  render() {
    console.log(this.props.location);
    return (
      <div className="login-background">
        <Container id="login-white-background">
          <Alert
            show={this.state.showAlert}
            variant="danger"
            dismissible
            onClose={_ => this.setState({ showAlert: false })}
          >
            Email already taken.
          </Alert>

          <Row>
            <Col>
              <br />
              <h1 className="logo">Running Mate</h1>

              <h2>Sign Up</h2>
              <br />
              <Form
                onSubmit={e => {
                  this.setState({ formSubmitted: true });
                  e.preventDefault();
                  this.props.dispatch(
                    signUp(
                      {
                        email: this.state.email,
                        password: this.state.password,
                        name: this.state.name
                      },
                      this.props.history,
                      this.alertCallback,
                      this.enableCallback
                    )
                  );
                }}
              >
                <Form.Group>
                  <Form.Control
                    name="name"
                    placeholder="Enter your name"
                    onChange={this.handleChange}
                    value={this.state.name}
                  />
                </Form.Group>
                <br />

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
                    placeholder="Enter a password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </Form.Group>
                <br />

                <Button
                  disabled={!this.isStateValid() || this.state.formSubmitted}
                  className="btn-block"
                  variant="primary"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <br />
              <h3>Have an account?</h3>
              <br />
              <Button onClick={_ => this.props.history.push("/")}>
                Go back to login
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    user: state.user
  }))(SignUp)
);
