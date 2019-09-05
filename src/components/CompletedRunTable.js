import React from "react";

import Table from "react-bootstrap/Table";

import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import parseTime from "../HelperFunctions/parseTime";
import speedCalculator from "../HelperFunctions/speedCalculator";

import { fetchDetailedRun } from "../actions";

function CompletedRunTable(props) {
  const rows = props.runs.map((run, index) => (
    <tr key={run.id}>
      <td onClick={_ => props.fetchDetailedRun(props.history, run.id)}>
        {index + 1}
      </td>
      <td>{run.length}</td>
      <td>{parseTime(run.duration)}</td>
      <td>{speedCalculator(run.length, run.duration)}</td>
    </tr>
  ));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Completed Runs</th>
          <th>Distance (miles)</th>
          <th>Time (HH:MM:SS)</th>
          <th>Speed (mph) </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

function mdp(dispatch) {
  return {
    fetchDetailedRun: (history, runId) =>
      dispatch(fetchDetailedRun(history, runId))
  };
}

export default withRouter(
  connect(
    null,
    mdp
  )(CompletedRunTable)
);
