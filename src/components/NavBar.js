import React from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";

function NavBar(props) {
  return (
    <Menu>
      <Menu.Item
        as="a"
        onClick={_ => {
          window.localStorage.removeItem("running-token");
          props.logout();
          props.history.push("/");
        }}
      >
        Logout
      </Menu.Item>
      <Menu.Item
        as="a"
        onClick={_ => {
          props.history.push("/runs");
        }}
      >
        My Runs
      </Menu.Item>
      <Menu.Item
        as="a"
        onClick={_ => {
          props.history.push("/runs/new");
        }}
      >
        New Run
      </Menu.Item>
    </Menu>
  );
}

function mdp(dispatch) {
  return {
    logout: () => dispatch({ type: "LOGOUT" })
  };
}

export default withRouter(
  connect(
    null,
    mdp
  )(NavBar)
);
