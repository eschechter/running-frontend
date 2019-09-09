import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { connect } from "react-redux";

class NavBar extends Component {
  state = {
    isNavExpanded: false
  };

  render() {
    return (
      <Navbar
        collapseOnSelect
        onToggle={_ =>
          this.setState({ isNavExpanded: !this.state.isNavExpanded })
        }
        expanded={this.state.isNavExpanded}
        expand="lg"
        bg="primary"
        variant="dark"
      >
        <Navbar.Brand
          data-toggle="collapse"
          onClick={_ => {
            this.props.history.push("/homepage");
            this.setState({ isNavExpanded: false });
          }}
          className="logo"
        >
          Running Mate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              data-toggle="collapse"
              onClick={_ => {
                this.props.history.push("/runs");
                this.setState({ isNavExpanded: false });
              }}
            >
              My Runs
            </Nav.Link>
            <Nav.Link
              onClick={_ => {
                this.props.history.push("/runs/new");
                this.setState({ isNavExpanded: false });
              }}
            >
              New Run
            </Nav.Link>
            <Nav.Link
              onClick={_ => {
                this.props.history.push("/runs/friend-requests");
                this.setState({ isNavExpanded: false });
              }}
            >
              Friend Requests
            </Nav.Link>
            <Nav.Link
              onClick={_ => {
                this.props.history.push("/runs/friends");
                this.setState({ isNavExpanded: false });
              }}
            >
              My Friends
            </Nav.Link>
            <Nav.Link
              onClick={_ => {
                window.localStorage.removeItem("running-token");
                this.props.logout();
                this.props.history.push("/");
                this.setState({ isNavExpanded: false });
              }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
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
