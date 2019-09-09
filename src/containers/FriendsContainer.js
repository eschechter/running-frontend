import React, { Component } from "react";

import { connect } from "react-redux";

import { withRouter, Route } from "react-router-dom";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
// import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";
import Button from "react-bootstrap/Button";

import { fetchFriends } from "../actions";

import FriendDetails from "../components/FriendDetails";

class FriendsContainer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.fetchFriends();
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchFriends();
    }
  }

  userClickHandler = friend => {
    this.props.getFriendDetail(friend);
    this.props.history.push("/runs/friends/details");
  };

  render() {
    const friendsComps = this.props.friends.map(user => (
      <Card bg="primary" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle>{user.email}</Card.Subtitle>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item>Total Runs: {user.runs.length} </ListGroup.Item>
          <ListGroup.Item>
            Completed Runs: {user.runs.filter(run => run.completed).length}
          </ListGroup.Item>
        </ListGroup>
        <Button
          className="btn-block"
          onClick={_ => this.userClickHandler(user)}
          variant="primary"
        >
          See details
        </Button>
      </Card>
    ));

    return (
      <>
        <Route
          exact
          path="/runs/friends"
          render={() => (
            <>
              <br />
              <h1>My friends</h1>
              <div className="column-wrapper">
                <CardColumns>{friendsComps}</CardColumns>
              </div>
            </>
          )}
        />
        <Route
          path="/runs/friends/details"
          render={() => (
            <>
              <FriendDetails />
            </>
          )}
        />
      </>
    );
  }
}

function msp(state) {
  return {
    friends: state.friends,
    user: state.user
  };
}

function mdp(dispatch) {
  return {
    fetchFriends: () => dispatch(fetchFriends()),
    getFriendDetail: friend =>
      dispatch({ type: "GET_FRIEND_DETAIL", payload: friend })
  };
}

export default withRouter(
  connect(
    msp,
    mdp
  )(FriendsContainer)
);
