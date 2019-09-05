import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

import { searchUsers } from "../actions";

class FriendSearchForm extends Component {
  state = { searchTerm: "" };

  changeHandler = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          this.props.searchFriends(this.state.searchTerm);
        }}
      >
        <Form.Group>
          <Form.Control
            onChange={this.changeHandler}
            type="text"
            value={this.state.searchTerm}
          />
        </Form.Group>
        <Button type="submit">Search for friends</Button>
      </Form>
    );
  }
}

function mdp(dispatch) {
  return {
    searchFriends: searchTerm => dispatch(searchUsers(searchTerm))
  };
}

export default connect(
  null,
  mdp
)(FriendSearchForm);
