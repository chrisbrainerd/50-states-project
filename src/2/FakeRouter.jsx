import React, { useState } from 'react';
import TabList from '@mapbox/mr-ui/tab-list';

import WixEmbedFormLink from './WixEmbedFormLink';
import FormRoute from './FormRoute';
import ResultsMap from './ResultsMap';

const components = [
  {
    id: 0,
    label: 'Call to action button',
    component: <WixEmbedFormLink />
  },
  {
    id: 1,
    label: 'Actual form',
    component: <FormRoute />
  },
  {
    id: 2,
    label: 'Results map',
    component: <ResultsMap />
  }
];

const FakeRouter = () => {
  const [activeTab, setActiveTab] = useState(1);
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
