import React, { Component } from "react";

import FriendSearchForm from "./FriendSearchForm";

import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import { connect } from "react-redux";
import {
  searchUsers,
  fetchRequestSenders,
  fetchRequestReceivers,
  requestFriend,
  acceptFriendRequest
} from "../actions";

class FriendRequestPage extends Component {
  state = {
    showingReceived: true
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.fetchRequestSenders();
      this.props.fetchRequestReceivers();
      this.props.searchUsers();
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchRequestSenders();
      this.props.fetchRequestReceivers();
      this.props.searchUsers();
    }
  }

  handleChange = val => {
    this.setState({ showingReceived: val });
  };

  render() {
    const userComps = this.props.users.map(user => (
      <Card
        key={user.id}
        border="primary"
        text="black"
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle>{user.email}</Card.Subtitle>
          <br />
          <Button
            disabled={this.props.buttonsDisabled}
            onClick={_ => {
              this.props.disableButtons();
              this.props.requestFriend(user.id);
            }}
            variant="primary"
          >
            Request Friend
          </Button>
        </Card.Body>
      </Card>
    ));

    const requestSenderComps = this.props.receivedFriendRequests.map(user => (
      <Card
        key={user.id}
        border="primary"
        text="black"
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle>{user.email}</Card.Subtitle>
          <br />
          <Button
            onClick={_ => {
              this.props.disableButtons();
              this.props.acceptFriendRequest(user.id);
            }}
            variant="primary"
          >
            Accept friend request
          </Button>
        </Card.Body>
      </Card>
    ));

    const requestReceiverComps = this.props.sentFriendRequests.map(user => (
      <Card
        key={user.id}
        border="primary"
        text="black"
        style={{ width: "18rem" }}
      >
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle>{user.email}</Card.Subtitle>
        </Card.Body>
      </Card>
    ));

    return (
      <>
        <br />
        <h2>
          Search for friends (or leave blank to list all non-friended users):
        </h2>
        <br />
        <FriendSearchForm />
        <div className="column-wrapper">
          <CardColumns>{userComps}</CardColumns>
        </div>
        <hr />
        <div className="button-toggle-wrapper">
          <ToggleButtonGroup
            type="radio"
            name="radio"
            value={this.state.showingReceived}
            onChange={this.handleChange}
          >
            <ToggleButton value={true}>Received Requests</ToggleButton>
            &nbsp;
            <ToggleButton value={false}>Sent Requests</ToggleButton>
          </ToggleButtonGroup>
          <br />
          <br />
        </div>
        {!this.state.showingReceived ? (
          requestReceiverComps.length > 0 ? (
            <>
              <h2>Sent requests:</h2>
              <div className="column-wrapper">
                <CardColumns>{requestReceiverComps}</CardColumns>
              </div>
            </>
          ) : (
            <h2>No sent requests</h2>
          )
        ) : requestSenderComps.length > 0 ? (
          <>
            <h2>Received requests:</h2> {requestSenderComps}
          </>
        ) : (
          <h2>No received requests</h2>
        )}
      </>
    );
  }
}

function msp(state) {
  return {
    user: state.user,
    users: state.searchedUsers,
    receivedFriendRequests: state.receivedFriendRequests,
    sentFriendRequests: state.sentFriendRequests,
    buttonsDisabled: state.disableRequestButtons
  };
}

function mdp(dispatch) {
  return {
    requestFriend: userId => dispatch(requestFriend(userId)),
    acceptFriendRequest: userId => dispatch(acceptFriendRequest(userId)),
    fetchRequestSenders: () => dispatch(fetchRequestSenders()),
    fetchRequestReceivers: () => dispatch(fetchRequestReceivers()),
    searchUsers: () => dispatch(searchUsers()),
    disableButtons: () => dispatch({ type: "DISABLE_BUTTONS" })
  };
}

export default connect(
  msp,
  mdp
)(FriendRequestPage);
