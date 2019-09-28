import React, { PureComponent } from 'react';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z`;

import {
  FaMapPin,
  FaCalendarDay,
  FaMonument,
  FaPalette,
  FaUserFriends,
  FaMoneyBillWave
} from 'react-icons/fa';

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

const getPin = (type) => {
  switch (type) {
    case 'event':
      return <FaCalendarDay />;
    case 'landmark':
      return <FaMonument />;
    case 'art-space':
      return <FaPalette className='art-space' />;
    case 'friend':
      return <FaUserFriends />;
    case 'sponsor':
      return <FaMoneyBillWave />;
    default:
      return <FaMapPin />;
  }
};

export default class Pin extends PureComponent {
  render() {
    const { size = 20, onClick, type } = this.props;

    return (
      <svg
        height={size}
        viewBox='0 0 24 24'
        style={{
          ...pinStyle,
          transform: `translate(${-size / 2}px,${-size}px)`
        }}
        onClick={onClick}
      >
        {/* <FaMapPin /> */}
        {getPin(type)}
        {/* <path d={ICON} /> */}
      </svg>
    );
  }
}
