import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup, NavigationControl, FullscreenControl} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';

const TOKEN = 'pk.eyJ1Ijoicm1yaWNlIiwiYSI6ImNqY3FsM2x6ajM2dHMycW85cWFvemg0bWMifQ.HiBtNtMmWjfS9AdpK9yv3Q'; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  };

  mapRef = React.createRef();

  updateViewport = viewport => {
    this.setState({viewport});
  };

  updateGeocoderViewport = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }

    return this.updateViewport({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  };


  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        ref={this.mapRef}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/rmrice/cjyt17lpa139s1cpjp5uxn0se"
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={TOKEN}
      >

        <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl />
        </div>
        <Geocoder
          mapRef={this.mapRef}
          onViewportChange={this.updateGeocoderViewport}
          mapboxApiAccessToken={TOKEN}
          placeholder="Search for a place in the US!"
          countries="US"
          onResult={this.geocoderResult}
        />
      </MapGL>
    );
  }
}

export function renderToDom(container) {
  render(<App />, container);
}
