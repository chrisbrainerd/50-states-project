import React, { Component, createRef } from 'react';
import Geocoder from 'react-map-gl-geocoder';
import MapGL, { Marker } from 'react-map-gl';
import { FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import ControlText from '@mapbox/mr-ui/control-text';
import ControlDate from '@mapbox/mr-ui/control-date';
import ControlAlert from '@mapbox/mr-ui/control-alert';

import validateStartDateBeforeEndDate from '@mapbox/mr-ui/form/validators/validate-start-date-before-end-date';

import Button from '@mapbox/mr-ui/button';
import ControlSelect from '@mapbox/mr-ui/control-select';
import moment from 'moment';

import Form from 'react-bootstrap/Form';

export const TOKEN =
  'pk.eyJ1Ijoicm1yaWNlIiwiYSI6ImNqY3FsM2x6ajM2dHMycW85cWFvemg0bWMifQ.HiBtNtMmWjfS9AdpK9yv3Q';
const backend = 'http://localhost:5000/places';

const SELECT_OPTIONS = [
  {
    label: 'Event',
    value: 'event'
  },
  {
    label: 'Landmark',
    value: 'landmark'
  },
  {
    label: 'Art space',
    value: 'art-space'
  },
  {
    label: 'A friendly face',
    value: 'friend'
  },
  {
    label: 'Sponsor',
    value: 'sponsor'
  }
];

// post data to backend API
const postData = (payload) => {
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

const initialState = {
  viewport: {},
  notes: '',
  displayName: '',
  whoAreYou: '',
  link: '',
  privateNotes: '',
  instagramHandle: '',
  twitterHandle: '',
  date: '',
  dateValidationError: '',
  type: '',
  description: '',
  submitterName: '',
  isLoading: false,
  isNetworkError: false,
  wasSubmittedCorrectly: false
};

class FormRoute extends Component {
  state = initialState;
  mapRef = createRef();
  geocoderContainerRef = createRef();

  handleOnResult = ({ result }) =>
    this.setState(
      {
        location: result,
        viewport: {
          latitude: result.center[1],
          longitude: result.center[0],
          zoom: 16,
          bearing: 0,
          pitch: 0
        }
      },
      () => {
        console.log(`|||this.mapRef`, this.mapRef);
        console.log(`|||this.state`, this.state);
      }
    );

  onViewportChange = (viewport) => this.setState({ viewport });
  handleFormChange = (value, field) => this.setState({ [field]: value });
  handleDateChange = (date) => {
    const dateValidationError = validateStartDateBeforeEndDate(date);
    this.setState({ date, dateValidationError });
  };

  handleSubmit = () => {
    const {
      location,
      displayName,
      date,
      link,
      privateNotes,
      twitterHandle,
      instagramHandle,
      description,
      type,
      submitterName
    } = this.state;

    // write coords and placename to geojson
    const payload = {
      coordinates: location.geometry.coordinates,
      name: location.text,
      address: location.place_name,
      id: location.id,
      displayName,
      date,
      link,
      privateNotes,
      twitterHandle,
      instagramHandle,
      description,
      type,
      submitterName
    };

    this.setState({ isLoading: true }, () => {
      postData(payload)
        .then((res) => this.setState({ wasSubmittedCorrectly: true }))
        .then((err) => {
          if (err) this.setState({ isNetworkError: true });
        });
    });
  };

  clearForm = () => {
    this.setState(initialState);
  };

  render = () => (
    <div id='form'>
      <label className='inline-block txt-bold txt-s mb12 mt18'>
        Where should we go?
      </label>
      <div
        ref={this.geocoderContainerRef}
        style={{ width: '100%', minWidth: '100%' }}
      />
      <div>
        <Geocoder
          mapRef={this.mapRef}
          containerRef={this.geocoderContainerRef}
          onResult={this.handleOnResult}
          mapboxApiAccessToken={TOKEN}
          className='asdf'
        />
        <div
          style={
            this.state.location
              ? { width: '100%', height: 300 }
              : { display: 'none' }
          }
        >
          <MapGL
            ref={this.mapRef}
            width='100%'
            height='100%'
            mapboxApiAccessToken={TOKEN}
            mapStyle='mapbox://styles/rmrice/cjyt17lpa139s1cpjp5uxn0se'
            {...this.state.viewport}
          >
            {this.state.location && (
              <Marker
                latitude={this.state.location.center[1]}
                longitude={this.state.location.center[0]}
                offsetLeft={-15}
                offsetTop={-30}
              >
                <FaMapMarkerAlt className='default-marker' />
              </Marker>
            )}
          </MapGL>
        </div>
      </div>
      {this.state.location &&
        this.state.location.place_type &&
        this.state.location.place_type.includes('address') && (
          <ControlText
            themeControlWrapper='mt12 form-field'
            id='displayName'
            label="What's here?"
            onChange={this.handleFormChange}
            value={this.state.displayName}
          />
        )}

      <ControlDate
        id='date'
        moment={moment}
        value={this.state.date}
        onChange={this.handleDateChange}
        dateRange={true}
        placeholder='start'
        endDatePlaceholder='end'
        label={
          // this fails proptype warnings but works ¯\_(ツ)_/¯
          <div className='form-field mt12'>
            When? <span className='txt-normal'>(optional)</span>
          </div>
        }
        minDate={new Date()}
        validationError={this.state.dateValidationError}
        themeWrapper='date-wrapper'
      />
      <ControlText
        themeControlWrapper='mt12 form-field'
        id='description'
        label='What makes this place important?'
        optional
        onChange={this.handleFormChange}
        value={this.state.description}
      />
      <ControlSelect
        options={SELECT_OPTIONS}
        label='What kind of thing is here?'
        id='type'
        onChange={this.handleFormChange}
        value={this.state.type}
      />
      <ControlText
        themeControlWrapper='mt12 form-field'
        id='link'
        label="Have a link to the place / event's website?"
        optional
        onChange={this.handleFormChange}
        value={this.state.link}
      />
      <ControlText
        themeControlWrapper='mt12 form-field'
        id='privateNotes'
        label="Any notes for the artists? (These won't be displayed publicly)"
        optional
        onChange={this.handleFormChange}
        value={this.state.privateNotes}
      />
      <ControlText
        themeControlWrapper='mt12 form-field'
        id='submitterName'
        placeholder='Name'
        label='Who are you?'
        optional
        onChange={this.handleFormChange}
        value={this.state.submitterName}
      />
      <ControlText
        themeControlWrapper='mt12 form-field'
        id='twitterHandle'
        placeholder='Twitter'
        label="Got a twitter or instagram handle? If you fill either of these out out we'll say the recommendation came from @your_handle_here"
        optional
        onChange={this.handleFormChange}
        value={this.state.twitterHandle}
      />
      <ControlText
        themeControlWrapper='mt12 form-field instagram'
        id='instagramHandle'
        placeholder='Instagram'
        optional
        onChange={this.handleFormChange}
        value={this.state.instagramHandle}
      />
      <div className='mt12'>
        <Button disabled={this.state.isLoading} onClick={this.handleSubmit}>
          Submit! {this.state.isLoading && <FaSpinner className='icon-spin' />}
        </Button>
      </div>
      {this.state.wasSubmittedCorrectly && (
        <>
          <p className='mt12'>
            ✨🚀 It's on our map! ✨🚀 Want to check out{' '}
            <a className='link' href=''>
              our trip so far?
            </a>
          </p>
          <p className='mt12'>
            Or got something else to suggest?
            <span className='ml6'>
              <Button onClick={this.startOver}>Do it again ⤴</Button>
            </span>
          </p>
        </>
      )}
    </div>
  );
}
export default FormRoute;
