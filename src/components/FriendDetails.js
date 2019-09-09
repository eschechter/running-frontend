import React, { Component } from "react";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import CompletedRunTable from "./CompletedRunTable";
import CompletedRunsChart from "./CompletedRunsChart";

import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { fetchDetailedRun } from "../actions";

class FriendDetails extends Component {
  state = {
    runs: []
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({
        runs: this.props.friend.runs
      });
    }
  }

  componentDidMount() {
    if (this.props.user.id && this.props.friend) {
      this.setState({
        runs: this.props.friend.runs
      });
    } else {
      this.props.history.push("/runs/friends");
    }
  }
  render() {
    console.log(this.state);
    const completedRuns = this.state.runs.filter(run => run.completed);
    const pendingRuns = this.state.runs.filter(run => !run.completed);

    const pendingRunComps = pendingRuns.map(run => (
      <Card border="primary" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{`Length: ${run.length} miles`}</Card.Title>
          <Card.Subtitle>{`City: ${run.city}`}</Card.Subtitle>
          <br />
          <Button
            onClick={_ => {
              this.props.dispatch(fetchDetailedRun(this.props.history, run.id));
            }}
            variant="primary"
          >
            View Map
          </Button>
        </Card.Body>
      </Card>
    ));
    return (
      <>
        <h1>Details for {this.props.friend.name}</h1>
        <br />
        <h2>Planned Runs (click text to see map) </h2>
        <div className="column-wrapper">
          <CardColumns>{pendingRunComps}</CardColumns>
        </div>
        <CompletedRunTable runs={completedRuns} />
        <CompletedRunsChart runs={completedRuns} />
      </>
    );
  }
}

function msp(state) {
  return {
    friend: state.selectedFriend,
    user: state.user
  };
}

export default withRouter(connect(msp)(FriendDetails));
