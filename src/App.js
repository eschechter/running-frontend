import React, { Component } from "react";
import "./App.css";
import { withRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RunsContainer from "./containers/RunsContainer";
import { retrieveUser } from "./actions";
import { connect } from "react-redux";
import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";

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
      <>
        <Route exact path="/" render={() => <Login />} />
        <Route path="/sign-up" render={() => <SignUp />} />
        <Route
          path="/runs"
          render={() => (
            <>
              <NavBar />
              <RunsContainer />
            </>
          )}
        />
        <Route
          path="/homepage"
          render={() => (
            <>
              <LandingPage />
            </>
          )}
        />
      </>
    );
  }
}

export default withRouter(
  connect(state => ({
    user: state.user
  }))(App)
);
