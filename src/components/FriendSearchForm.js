import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <Container>
        <Row>
          <Col>
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
              <Button className="btn-block" type="submit">
                Search for friends
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
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
