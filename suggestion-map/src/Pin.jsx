import React from 'react';

import {
  FaMapPin,
  FaCalendarDay,
  FaMonument,
  FaPalette,
  FaMapMarkerAlt,
  FaDrumstickBite
} from 'react-icons/fa';
import { MdHotel } from 'react-icons/md';

const getPin = (type) => {
  switch (type) {
    case 'event':
      return FaCalendarDay;
    case 'landmark':
      return FaMonument;
    case 'art-space':
      return FaPalette;
    // case 'friend':
    //   return FaUserFriends;
    case 'food':
      return FaDrumstickBite;
    case 'lodging':
      return MdHotel;
    case 'other':
      return FaMapMarkerAlt;
    default:
      return FaMapPin;
  }
};

const Pin = ({ size, onClick, type }) => {
  const Pin = getPin(type);
  return (
    <Pin
      style={{
        fontSize: '30px',
        color: '#213e8c',
        filter: 'drop-shadow(2px 2px 0px rgba(255,255,255,0.7))'
      }}
      onClick={onClick}
    />
  );
};

export default Pin;
