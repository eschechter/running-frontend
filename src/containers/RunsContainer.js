import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { fetchRuns, fetchDetailedRun } from "../actions";
import NewRunMap from "../components/NewRunMap";
import DisplayRunMap from "../components/DisplayRunMap";

class RunsContainer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.dispatch(fetchRuns());
    }
  }

  render() {
    const runComps = this.props.runs.map(run => (
      <li
        onClick={_ =>
          this.props.dispatch(fetchDetailedRun(this.props.history, run.id))
        }
      >
        {`Length: ${run.length} miles. Time to complete: ${run.duration}`}
      </li>
    ));
    return (
      <>
        <Route path="/runs/new" render={() => <NewRunMap />} />
        <Route path="/runs/display" render={() => <DisplayRunMap />} />
        <Route
          exact
          path="/runs"
          render={() => (
            <>
              <h1>Welcome: {this.props.user.name}</h1>
              {runComps}
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
