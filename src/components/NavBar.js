import React from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { connect } from "react-redux";

function NavBar(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>My App!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            onClick={_ => {
              window.localStorage.removeItem("running-token");
              props.logout();
              props.history.push("/");
            }}
          >
            Logout
          </Nav.Link>
          <Nav.Link
            onClick={_ => {
              props.history.push("/runs");
            }}
          >
            My Runs
          </Nav.Link>
          <Nav.Link
            onClick={_ => {
              props.history.push("/runs/new");
            }}
          >
            New Run
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
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
