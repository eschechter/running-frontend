import React, { Component } from "react";
import { Form } from "semantic-ui-react";

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

  render() {
    return (
      <div>
        <br />
        <h1>Sign Up</h1>
        <br />
        <Form onSubmit={() => {}}>
          {/* <Form.Group widths="equal"> */}
          <Form.Field>
            <Form.Input
              name="name"
              placeholder="Enter your name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              name="email"
              type="email"
              placeholder="Enter your email address"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Field>
          {/* </Form.Group> */}
          <br />
          <Form.Button disabled={!this.isStateValid()}>
            Create Account
          </Form.Button>
        </Form>
        <br />
      </div>
    );
  }
}

export default SignUp;
