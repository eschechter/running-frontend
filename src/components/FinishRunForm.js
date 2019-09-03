import React, { Component } from "react";

import { completeRun } from "../actions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class FinishRunForm extends Component {
  state = { hours: 0, minutes: 0, seconds: 0 };

  changeHandler = e => {
    const inputType = e.target.name;
    this.setState({
      [inputType]: e.target.value
    });
  };

  render() {
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          this.props.completeRun(
            this.state.hours * 3600 +
              this.state.minutes * 60 +
              Number.parseInt(this.state.seconds)
          );
        }}
      >
        <Form.Row>
          <Col></Col>
          <Col></Col>

          <Col>
            <Form.Label>Hours</Form.Label>
            <Form.Control
              onChange={this.changeHandler}
              name="hours"
              type="number"
              min={0}
              max={10}
            />
          </Col>
          <Col>
            <Form.Label>Minutes</Form.Label>

            <Form.Control
              onChange={this.changeHandler}
              name="minutes"
              type="number"
              min={0}
              max={59}
            />
          </Col>
          <Col>
            <Form.Label>Seconds</Form.Label>

            <Form.Control
              onChange={this.changeHandler}
              name="seconds"
              type="number"
              min={0}
              max={59}
            />
          </Col>
          <Col></Col>
          <Col></Col>
        </Form.Row>
        <br />
        <Form.Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button type="submit">Mark Run Complete</Button>
          </Col>
          <Col></Col>
          <Col></Col>
        </Form.Row>
      </Form>
    );
  }
}

function mdp(dispatch) {
  return {
    completeRun: duration => dispatch(completeRun(duration))
  };
}

export default withRouter(
  connect(
    null,
    mdp
  )(FinishRunForm)
);
