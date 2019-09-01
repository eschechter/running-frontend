import React, { Component } from "react";
import { signUp } from "../actions.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  isStateValid = () => {
    return this.state.name && this.state.email && this.state.password;
  };

  handleChange = event => {
    const inputType = event.target.name;
    this.setState({
      [inputType]: event.target.value
    });
  };

  // render() {
  //   return (
  //     <div>
  //       <br />
  //       <h1>Sign Up</h1>
  //       <br />
  //       <Form
  //         onSubmit={e => {
  //           e.preventDefault();
  //           this.props.dispatch(
  //             signUp(
  //               {
  //                 email: this.state.email,
  //                 password: this.state.password,
  //                 name: this.state.name
  //               },
  //               this.props.history
  //             )
  //           );
  //         }}
  //       >
  //         {/* <Form.Group widths="equal"> */}
  //         <Form.Field>
  //           <Form.Input
  //             name="name"
  //             placeholder="Enter your name"
  //             onChange={this.handleChange}
  //             value={this.state.name}
  //           />
  //         </Form.Field>
  //         <Form.Field>
  //           <Form.Input
  //             name="email"
  //             type="email"
  //             placeholder="Enter your email address"
  //             onChange={this.handleChange}
  //             value={this.state.email}
  //           />
  //         </Form.Field>
  //         <Form.Field>
  //           <Form.Input
  //             name="password"
  //             type="password"
  //             placeholder="Enter a password"
  //             onChange={this.handleChange}
  //             value={this.state.password}
  //           />
  //         </Form.Field>
  //         {/* </Form.Group> */}
  //         <br />
  //         <Form.Button disabled={!this.isStateValid()}>
  //           Create Account
  //         </Form.Button>
  //       </Form>
  //       <br />
  //     </div>
  //   );
  // }

  render() {
    return (
      <div className="login-background">
        <Container id="white-background">
          <Row>
            <Col>
              <br />
              <h1>App Name</h1>
              <br />

              <h2>Sign Up</h2>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.dispatch(
                    signUp(
                      {
                        email: this.state.email,
                        password: this.state.password,
                        name: this.state.name
                      },
                      this.props.history
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
                  disabled={!this.isStateValid()}
                  className="btn-block"
                  variant="primary"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
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
