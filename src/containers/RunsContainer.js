import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { fetchRuns, fetchDetailedRun } from "../actions";

import NewRunMap from "../components/NewRunMap";
import DisplayRunMap from "../components/DisplayRunMap";
import FriendRequestPage from "../components/FriendRequestPage";
import CompletedRunTable from "../components/CompletedRunTable";
import CompletedRunsChart from "../components/CompletedRunsChart";

class RunsContainer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.dispatch(fetchRuns());
    }
  }

  render() {
    const completedRuns = this.props.runs.filter(run => run.completed);
    const pendingdRuns = this.props.runs.filter(run => !run.completed);

    const pendingdRunComps = pendingdRuns.map(run => (
      <li
        onClick={_ =>
          this.props.dispatch(fetchDetailedRun(this.props.history, run.id))
        }
      >
        {`Length: ${run.length} miles`}
      </li>
    ));
    return (
      <>
        <Route path="/runs/friends" render={() => <FriendRequestPage />} />
        <Route path="/runs/new" render={() => <NewRunMap />} />
        <Route path="/runs/display" render={() => <DisplayRunMap />} />
        <Route
          exact
          path="/runs"
          render={() => (
            <>
              <h1>Welcome: {this.props.user.name}</h1>

              <h2>Planned Runs (click text to see map) </h2>

              <ol>{pendingdRunComps}</ol>
              <br />
              <h2>Completed Runs (click number in left column to see map)</h2>
              <CompletedRunTable runs={completedRuns} />
              {completedRuns.length >= 2 ? (
                <CompletedRunsChart runs={completedRuns} />
              ) : null}
            </>
          )}
        />
      </>
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
