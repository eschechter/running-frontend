import React from "react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

function LandingPage(props) {
  return (
    <div id="landing-page">
      <div id="white-background">
        <h1>Welcome, {props.user.name}</h1>
        <hr />
        <h2
          className={"header-link"}
          onClick={_ => {
            props.history.push("/runs");
          }}
        >
          My Runs
        </h2>
        <hr />
        <h2
          className={"header-link"}
          onClick={_ => {
            props.history.push("/runs/new");
          }}
        >
          New Run
        </h2>
        <hr />

        <h2
          className={"header-link"}
          onClick={_ => {
            props.history.push("/runs/friend-requests");
          }}
        >
          Friend Requests
        </h2>
        <hr />
        <h2
          className={"header-link"}
          onClick={_ => {
            props.history.push("/runs/friends");
          }}
        >
          My Friends
        </h2>
        <hr />
        <h2
          className={"header-link"}
          onClick={_ => {
            window.localStorage.removeItem("running-token");
            props.logout();
            props.history.push("/");
          }}
        >
          Logout
        </h2>
      </div>
    </div>
  );
}

function msp(state) {
  return {
    user: state.user
  };
}

function mdp(dispatch) {
  return {
    logout: () => dispatch({ type: "LOGOUT" })
  };
}

export default withRouter(
  connect(
    msp,
    mdp
  )(LandingPage)
);
