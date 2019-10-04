import React, { Component } from 'react';

import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from 'react-map-gl';
import Pin from './Pin';
import PopupContent from './Popup';
export const TOKEN =
  'pk.eyJ1Ijoicm1yaWNlIiwiYSI6ImNqY3FsM2x6ajM2dHMycW85cWFvemg0bWMifQ.HiBtNtMmWjfS9AdpK9yv3Q'; // Set your mapbox token here

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

// const backend = 'http://192.168.0.14:5000/places';
const backend = `http://${window.location.hostname}:5000/places`;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 32.785164,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null,
      data: null,
      geocoderResult: null
    };
  }
  onViewportChange = (viewport) => this.setState({ viewport });

  componentDidMount = () => {
    this.fetchData()
      .then((res) => {
        this.setState({ err: res });
        this.setState({ data: res.features });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ err: err });
      });
  };

  // grab data fron backend API
  fetchData = async () => {
    const response = await fetch(backend);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  // post data to backend API
  postData = (payload) => {
    return fetch(backend, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .catch((err) => console.log(`Error: ${err}`));
  };

  mapRef = React.createRef();

  updateViewport = (viewport) => {
    this.setState({ viewport });
  };

  updateGeocoderViewport = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return this.updateViewport({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  geocoderResult = (data) => {
    // write coords and placename to geojson
    const payload = {
      coordinates: data.result.geometry.coordinates,
      name: data.result.text,
      address: data.result.place_name,
      id: data.result.id
    };
    console.log(`|||data`, data);
    this.setState({ geocoderResult: data.result });
    this.postData(payload)
      .then((res) => console.log('success'))
      .then((err) => console.log('error: ', err));
  };

  renderMarker = (place) => {
    const lat = place.geometry.coordinates[1];
    const lon = place.geometry.coordinates[0];
    const id = place.id || place.properties.id;

    return (
      <Marker key={`marker-${id}`} longitude={lon} latitude={lat}>
        <Pin
          type={place.properties.type}
          size={20}
          onClick={() =>
            this.setState({
              popupInfo: place
            })
          }
        />
      </Marker>
    );
  };

  renderPopup() {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor='top'
          longitude={popupInfo.properties.coordinates[0]}
          latitude={popupInfo.properties.coordinates[1]}
          onClose={() => this.setState({ popupInfo: null })}
          closeOnClick
        >
          <PopupContent info={popupInfo} />
        </Popup>
      )
    );
  }

  render() {
    const { viewport } = this.state;
    return (
      <MapGL
        ref={this.mapRef}
        {...viewport}
        width='100%'
        height='300px'
        mapStyle='mapbox://styles/rmrice/cjyt17lpa139s1cpjp5uxn0se'
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={TOKEN}
        children={this.props.children}
      >
        {this.state.data && this.state.data.map(this.renderMarker)}
        {this.state.geocoderResult
          ? this.renderMarker(this.state.geocoderResult)
          : null}
        {this.renderPopup()}

        <div className='fullscreen' style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className='nav' style={navStyle}>
          <NavigationControl />
        </div>
      </MapGL>
    );
  }
}
