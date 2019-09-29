import React, { useState } from 'react';
import TabList from '@mapbox/mr-ui/tab-list';

import WixEmbedFormLink from './WixEmbedFormLink';
import FormRoute from './FormRoute';
import ResultsMap from './ResultsMap';
import PopupContent from './Popup';

const components = [
  {
    id: '0',
    label: 'Call to action button',
    component: <WixEmbedFormLink />
  },
  {
    id: '1',
    label: 'Actual form',
    component: <FormRoute />
  },
  {
    id: '2',
    label: 'Results map',
    component: <ResultsMap />
  },
  {
    id: '3',
    label: 'Map marker popup',
    component: (
      <div className='mapboxgl-popup-content' style={{ width: 250 }}>
        <button className='mapboxgl-popup-close-button' type='button'>
          ×
        </button>
        <PopupContent
          info={{
            type: 'Feature',
            properties: {
              coordinates: [-97.763726, 30.255746],
              name: 'Alamo Drafthouse Cinema',
              address:
                'Alamo Drafthouse Cinema, 1120 S Lamar Blvd, Austin, Texas 78704, United States of America',
              id: 'poi.3195455751641',
              displayName: 'Alamo drafthouse',
              date: {
                date: new Date(),
                endDate: new Date('15Feb2020')
              },
              link: 'alamodrafthouse.com',
              privateNotes:
                "call me at 411-111-1111 when you get there, i'll get you in the back entrance",
              twitterHandle: '@a_wazard',
              instagramHandle: '@a_wazard',
              description: "it's pretty sweet",
              type: 'landmark',
              name: 'Chirs'
            },
            geometry: {
              type: 'Point',
              coordinates: [-97.763726, 30.255746]
            }
          }}
        />
      </div>
    )
  }
];

const FakeRouter = () => {
  const [activeTab, setActiveTab] = useState('1');
  return (
    <div className='AppWrapper'>
      <TabList
        onChange={setActiveTab}
        activeItem={activeTab}
        items={components}
        themeItem='mb12 border-b--2'
      />
      {components[activeTab].component}
    </div>
  );
};
export default FakeRouter;
