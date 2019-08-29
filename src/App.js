import React, { Component } from "react";
import "./App.css";
import { withRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RunsContainer from "./containers/RunsContainer";
import { retrieveUser } from "./actions";
import { connect } from "react-redux";
import NavBar from "./components/NavBar";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("running-token");
    if (token) {
      this.props.dispatch(retrieveUser(token, this.props.history));
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => <Login />} />
        <Route path="/sign-up" render={() => <SignUp />} />
        <Route
          path="/runs"
          render={() => (
            <>
              <NavBar />
              <h1>Welcome: {this.props.user.name}</h1>
              <RunsContainer />
            </>
          )}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    user: state.user
  }))(App)
);
