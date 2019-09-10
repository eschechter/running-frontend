import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { fetchRuns, fetchDetailedRun } from "../actions";

import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import NewRunMap from "../components/NewRunMap";
import DisplayRunMap from "../components/DisplayRunMap";
import FriendRequestPage from "../components/FriendRequestPage";
import FriendsContainer from "./FriendsContainer";
import CompletedRunTable from "../components/CompletedRunTable";
import CompletedRunsChart from "../components/CompletedRunsChart";

class RunsContainer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.dispatch(fetchRuns());
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.dispatch(fetchRuns());
    }
  }

  render() {
    const completedRuns = this.props.runs.filter(run => run.completed);
    const pendingRuns = this.props.runs.filter(run => !run.completed);

    const pendingRunComps = pendingRuns.map(run => (
      <Card
        key={run.id}
        border="primary"
        text="black"
        style={{ width: "18rem" }}
      >
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
      <div id="runs-container">
        <Route
          path="/runs/friend-requests"
          render={() => <FriendRequestPage />}
        />
        <Route path="/runs/friends" render={() => <FriendsContainer />} />
        <Route path="/runs/new" render={() => <NewRunMap />} />
        <Route path="/runs/display" render={() => <DisplayRunMap />} />
        <Route
          exact
          path="/runs"
          render={() => (
            <div id="runs-index">
              <br />
              {pendingRunComps.length > 0 ? (
                <h2>Planned runs:</h2>
              ) : (
                <h2>No planned runs</h2>
              )}
              <div className="column-wrapper">
                <CardColumns>{pendingRunComps}</CardColumns>
              </div>
              <br />
              {completedRuns.length >= 1 ? (
                <>
                  <h2>Completed runs (click city in left column to see map)</h2>
                  <CompletedRunTable runs={completedRuns} />
                </>
              ) : null}
              <br />
              {completedRuns.length >= 3 ? (
                <CompletedRunsChart runs={completedRuns} />
              ) : null}
            </div>
          )}
        />
      </div>
    );
  }
}

function msp(state) {
  return {
    user: state.user,
    runs: state.runs
  };
}

export default withRouter(
  connect(
    msp,
    null
  )(RunsContainer)
);
