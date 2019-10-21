import React from 'react';

import {
  FaMapPin,
  FaCalendarDay,
  FaMonument,
  FaPalette,
  FaUserFriends,
  FaDrumstickBite
} from 'react-icons/fa';

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
    default:
      return FaMapPin;
  }
};

const Pin = ({ size, onClick, type }) => {
  const Pin = getPin(type);
  return <Pin onClick={onClick} />;
};

export default Pin;
