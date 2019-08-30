import React, { Component } from "react";
import WebMercatorViewport from "viewport-mercator-project";
import ReactMapGL, { Marker } from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import haversineSum from "../HelperFunctions/haversineSum";
import startLine from "../images/start-line.png";
import runMarker from "../images/run-marker.png";
import checkeredFlag from "../images/checkered-flag.png";

class NewRunMap extends Component {
  state = {
    viewport: {
      width: "100%",
      height: 400,
      latitude: 40.6708,
      longitude: -73.9645,
      zoom: 8
    }
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

      const viewport = new WebMercatorViewport({ width: 600, height: 400 });
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
          <h1>{haversineSum(arrayMarkers)}</h1>
          <ReactMapGL
            {...this.state.viewport}
            mapOptions={{ style: "mapbox://styles/mapbox/streets-v10" }}
            onViewportChange={viewport => {
              if (viewport.longitude > 0) {
                viewport.longitude = 0;
              }
              this.setState(viewport);
            }}
            mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
          >
            {markerComps}
            <PolylineOverlay points={arrayMarkers} />
          </ReactMapGL>
        </>
      );
    } else {
      return <h1>Please select a run to display</h1>;
    }
  }
}

function msp(state) {
  return {
    displayedRun: state.displayedRun
  };
}

export default withRouter(connect(msp)(NewRunMap));
