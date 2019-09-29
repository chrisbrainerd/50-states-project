import React, { Component } from 'react';
// import { Formik } from 'formik';
import Form from '@mapbox/mr-ui/form';
import FormSubmit from '@mapbox/mr-ui/form-submit';
import ControlText from '@mapbox/mr-ui/control-text';
import ControlWrapper from '@mapbox/mr-ui/control-wrapper';
import Geocoder from 'react-mapbox-gl-geocoder';
import { TOKEN } from './Map';

const mapAccess = {
  mapboxApiAccessToken: TOKEN
};
const queryParams = {
  country: 'us'
};

const formConfig = {
  name: {
    label: 'Who are you?'
    // placeHolder: 'Enter your name'
  },
  recommendation: {
    label: 'Where should they visit?'
  },
  date: {
    label: 'Is there a particular date(s) they should go?'
  },
  link: {
    label: 'Got a link to a website?'
  }
};

class SuggestionForm extends Component {
  onSelected = (viewport, item) => {
    // this.setState({viewport});
    console.log('Selected: ', item);
  };

  renderForm = (getControlProps, onSubmit) => {
    return (
      <div className='flex-parent flex-parent--column px12 py12'>
        <div className='mt6'>
          <ControlText {...getControlProps('name')} />
        </div>
        <div className='mt6'>
          <ControlWrapper {...getControlProps('recommendation')}>
            <Geocoder
              {...mapAccess}
              onSelected={this.onSelected}
              hideOnSelect={true}
              queryParams={queryParams}
            />
          </ControlWrapper>
        </div>
        <div className='mt6'>
          <ControlText {...getControlProps('date')} />
        </div>
        <div className='mt6'>
          <ControlText {...getControlProps('link')} />
        </div>

        <div className='mt12 flex-parent'>
          <FormSubmit
            themeButton='ml-auto btn px24 py12 round-full txt-s'
            label='Put it on the map!'
            onSubmit={onSubmit}
          />
        </div>
      </div>
    );
  };

  handleFormData = (formData) => {
    console.log(formData);
  };

  render() {
    return (
      <div className='h-full w-full'>
        <Form
          config={formConfig}
          renderForm={this.renderForm}
          handleFormData={this.handleFormData}
        />
      </div>
    );
  }
}

export default SuggestionForm;
