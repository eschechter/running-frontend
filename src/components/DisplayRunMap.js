import React, { Component } from "react";
import WebMercatorViewport from "viewport-mercator-project";
import { StaticMap, Marker } from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import haversineSum from "../HelperFunctions/haversineSum";
import startLine from "../images/start-line.png";
import runMarker from "../images/run-marker.png";
import checkeredFlag from "../images/checkered-flag.png";

import { completeRun } from "../actions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class DisplayRunMap extends Component {
  state = {
    viewport: {
      width: "60%",
      height: "70%",
      latitude: 40.6708,
      longitude: -73.9645,
      zoom: 8
    },
    hours: 0,
    minutes: 0,
    seconds: 0,
    numResizes: 0
  };

  changeHandler = e => {
    const inputType = e.target.name;
    this.setState({
      [inputType]: e.target.value
    });
  };

  componentDidMount() {
    if (this.props.displayedRun.id) {
      const longitudes = this.props.displayedRun.coordinates.map(
        point => point.x
      );
      const latitudes = this.props.displayedRun.coordinates.map(
        point => point.y
      );

      const maxLong = Math.max(...longitudes);
      const minLong = Math.min(...longitudes);
      const maxLat = Math.max(...latitudes);
      const minLat = Math.min(...latitudes);

      const viewport = new WebMercatorViewport({
        width: window.innerWidth * 0.59,
        height: window.innerHeight * 0.69
      });
      const bound = viewport.fitBounds([[minLong, minLat], [maxLong, maxLat]], {
        padding: 20,
        offset: [0, -40]
      });
      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude: bound.latitude,
          longitude: bound.longitude,
          zoom: bound.zoom
        }
      });
    } else {
      this.props.history.push("/runs");
    }
  }

  render() {
    console.log("rerendering");
    if (this.props.displayedRun.id) {
      const arrayMarkers = this.props.displayedRun.coordinates.map(point => [
        point.x,
        point.y
      ]);

      let markerComps = [];
      for (let i = 0; i < arrayMarkers.length; i++) {
        let image = runMarker;
        if (i === 0) {
          image = startLine;
        } else if (i === arrayMarkers.length - 1) {
          image = checkeredFlag;
        }
        markerComps.push(
          <Marker
            key={i}
            longitude={arrayMarkers[i][0]}
            latitude={arrayMarkers[i][1]}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <img width="20px" height="20px" src={image} />
          </Marker>
        );
      }

      return (
        <>
          <h1>Distance: {haversineSum(arrayMarkers)} miles</h1>
          <Form
            onSubmit={e => {
              e.preventDefault();
              this.props.completeRun(
                this.state.hours * 3600 +
                  this.state.minutes * 60 +
                  this.state.seconds
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
          <br />
          <StaticMap
            onResize={_ =>
              this.setState({ numResizes: this.state.numResizes + 1 })
            }
            {...this.state.viewport}
            mapOptions={{ style: "mapbox://styles/mapbox/streets-v10" }}
            mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
          >
            {markerComps}
            <PolylineOverlay points={arrayMarkers} />
          </StaticMap>
        </>
      );
    } else {
      return <h1>Please select a run to display</h1>;
    }
  }
}

function mdp(dispatch) {
  return {
    completeRun: duration => dispatch(completeRun(duration))
  };
}

function msp(state) {
  return {
    displayedRun: state.displayedRun
  };
}

export default withRouter(
  connect(
    msp,
    mdp
  )(DisplayRunMap)
);
