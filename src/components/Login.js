import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: ""
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
        {/* <Card > */}
        <br />
        <h1>Sign In</h1>
        <br />
        <Form onSubmit={() => {}}>
          <Form.Field>
            <Form.Input
              name="email"
              placeholder="Enter your email address"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </Form.Field>
          <br />
          <Form.Field>
            <Form.Input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </Form.Field>

          <br />
          <Form.Button>Submit</Form.Button>
        </Form>

        <h3>New User?</h3>
        <h3>
          <a onClick={_ => this.props.history.push("/sign-up")}>
            Sign up here!
          </a>
        </h3>
        <br />
        {/* </Card> */}
      </div>
    );
  }
}

export default withRouter(Login);
