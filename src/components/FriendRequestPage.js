import React, { Component } from "react";

import FriendSearchForm from "./FriendSearchForm";

import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import {
  searchUsers,
  fetchRequestSenders,
  fetchRequestReceivers,
  requestFriend,
  acceptFriendRequest
} from "../actions";

class FriendRequestPage extends Component {
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

        {requestReceiverComps.length > 0 ? (
          <>
            <h2>Sent requests:</h2>
            <div className="column-wrapper">
              <CardColumns>{requestReceiverComps}</CardColumns>
            </div>
          </>
        ) : (
          <h2>No sent requests</h2>
        )}
        <hr />

        {requestSenderComps.length > 0 ? (
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
