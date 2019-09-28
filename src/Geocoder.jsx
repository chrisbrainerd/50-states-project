import React, { Component } from 'react';
import { render } from 'react-dom';
import Geocoder from 'react-map-gl-geocoder';
import { TOKEN } from './Map';

class GeocoderInput extends Component {
  state = {};

  mapRef = React.createRef();
  geocoderContainerRef = React.createRef();

  handleOnResult = (event) => {
    console.log(`|||event`, event);
    // this.setState({
    //   searchResultLayer: new GeoJsonLayer({
    //     id: 'search-result',
    //     data: event.result.geometry,
    //     getFillColor: [255, 0, 0, 128],
    //     getRadius: 1000,
    //     pointRadiusMinPixels: 10,
    //     pointRadiusMaxPixels: 10
    //   })
    // });
  };

  render() {
    return (
      <div>
        <div ref={this.geocoderContainerRef} />
        <Geocoder
          mapRef={this.mapRef}
          containerRef={this.geocoderContainerRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken={TOKEN}
          className='asdf'
        />
      </div>
    );
  }
}

export default GeocoderInput;
