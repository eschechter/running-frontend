import React, { Component } from "react";
import "./App.css";
import { withRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RunsContainer from "./containers/RunsContainer";
import { retrieveUser } from "./actions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("running-token");
    if (token) {
      this.props.retrieveUser(token, this.props.history);
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="App">
        <Route path="/login" render={() => <Login />} />
        <Route path="/sign-up" render={() => <SignUp />} />
        <Route path="/runs" render={() => <RunsContainer />} />
      </div>
    );
  }
}

function mdp(dispatch) {
  return {
    retrieveUser: (token, history) => retrieveUser(dispatch, token, history)()
  };
}

export default connect(
  null,
  mdp
)(withRouter(App));
