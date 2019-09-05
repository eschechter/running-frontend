import React, { Component } from "react";

import FriendSearchForm from "./FriendSearchForm";

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
      <li>
        Name: {user.name}, Email: {user.email}{" "}
        <button onClick={_ => this.props.requestFriend(user.id)}>
          Request friend!
        </button>
      </li>
    ));

    const requestSenderComps = this.props.receivedFriendRequests.map(user => (
      <li>
        Name: {user.name}, Email: {user.email}
        <button onClick={_ => this.props.acceptFriendRequest(user.id)}>
          Accept Request
        </button>
      </li>
    ));

    const requestReceiverComps = this.props.sentFriendRequests.map(user => (
      <li>
        Name: {user.name}, Email: {user.email}{" "}
      </li>
    ));

    return (
      <>
        <h2>
          Search for friends (or leave blank to list all non-friended users):
        </h2>
        <ul>{userComps}</ul>
        <FriendSearchForm />
        <h2>Sent requests:</h2>
        {requestReceiverComps}
        <h2>Received requests:</h2>
        {requestSenderComps}
      </>
    );
  }
}

function msp(state) {
  console.log(state);

  return {
    user: state.user,
    users: state.searchedUsers,
    receivedFriendRequests: state.receivedFriendRequests,
    sentFriendRequests: state.sentFriendRequests
  };
}

function mdp(dispatch) {
  return {
    requestFriend: userId => dispatch(requestFriend(userId)),
    acceptFriendRequest: userId => dispatch(acceptFriendRequest(userId)),
    fetchRequestSenders: () => dispatch(fetchRequestSenders()),
    fetchRequestReceivers: () => dispatch(fetchRequestReceivers()),
    searchUsers: () => dispatch(searchUsers())
  };
}

export default connect(
  msp,
  mdp
)(FriendRequestPage);
