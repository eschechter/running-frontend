import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../actions";
import { connect } from "react-redux";

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
        <Form
          onSubmit={e => {
            e.preventDefault();
            this.props.dispatch(
              loginUser(
                {
                  email: this.state.email,
                  password: this.state.password
                },
                this.props.history
              )
            );
          }}
        >
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
