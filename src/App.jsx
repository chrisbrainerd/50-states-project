import React from 'react';
import Map from './Map';
import SuggestionForm from './SuggestionForm';
import Geocoder from './Geocoder';

const App = () => (
  <div className='flex-parent w-full h-full'>
    <div className='flex-child flex-child--grow'>
      <Map />
      {/* <Geocoder /> */}
    </div>
    <div className='w300'>
      <SuggestionForm />
    </div>
  </div>
);

export default App;
