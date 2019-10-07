import React, { Component } from 'react';

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

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import ReactDOM from 'react-dom/server';

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none'
};

console.log(
  `|||ReactDOM.renderToString(<FaCalendarDay />)`,
  ReactDOM.renderToString(<FaCalendarDay />)
);

const getPin = (type) => {
  switch (type) {
    case 'event':
      return FaCalendarDay;
    case 'landmark':
      return FaMonument;
    case 'art-space':
      return FaPalette;
    case 'friend':
      return FaUserFriends;
    case 'sponsor':
      return FaMoneyBillWave;
    default:
      return FaMapPin;
  }
};
let i = 0;

const Pin = ({ size, onClick, type }) => {
  const Pin = getPin(type);
  return <Pin onClick={onClick} />;
};

export default Pin;

// class Pin extends Component {
//   render() {
//     const { size = 20, onClick, type } = this.props;

//     // const Pin = getPin(type);
//     // console.log(
//     //   `|||ReactDOM.renderToString(<Pin />)`,
//     //   ReactDOM.renderToString(<Pin />)
//     // );

//     // return <FontAwesomeIcon icon={faCoffee} />;
//     document.title = '' + ++i;
//     return <FaMapPin style={{ fill: 'rgb(221, 0, 0)', stroke: 'none' }} />;

//     // return (
//     //   <svg
//     //     height='20'
//     //     viewBox='0 0 24 24'
//     //     // style='fill: rgb(221, 0, 0); stroke: none;'
//     //     style={{ fill: 'rgb(221, 0, 0)', stroke: 'none' }}
//     //   >
//     //     <path
//     //       d='M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
//     // c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
//     // C20.1,15.8,20.2,15.8,20.2,15.7z'
//     //     ></path>
//     //   </svg>
//     // );

//     // return (
//     //   <svg
//     //     stroke='currentColor'
//     //     fill='currentColor'
//     //     stroke-width='0'
//     //     viewBox='0 0 288 512'
//     //     height='1em'
//     //     width='1em'
//     //     xmlns='http://www.w3.org/2000/svg'
//     //     xmlnsXlink='http://www.w3.org/1999/xlink'
//     //     xmlnsSvg='http://www.w3.org/2000/svg'
//     //   >
//     //     <path d='M112 316.94v156.69l22.02 33.02c4.75 7.12 15.22 7.12 19.97 0L176 473.63V316.94c-10.39 1.92-21.06 3.06-32 3.06s-21.61-1.14-32-3.06zM144 0C64.47 0 0 64.47 0 144s64.47 144 144 144 144-64.47 144-144S223.53 0 144 0zm0 76c-37.5 0-68 30.5-68 68 0 6.62-5.38 12-12 12s-12-5.38-12-12c0-50.73 41.28-92 92-92 6.62 0 12 5.38 12 12s-5.38 12-12 12z'></path>
//     //   </svg>
//     // );
//     return <Pin onClick={onClick} />;
//     // return (
//     // <svg
//     //   height={size}
//     //   viewBox='0 0 24 24'
//     //   style={{
//     //     ...pinStyle,
//     //     transform: `translate(${-size / 2}px,${-size}px)`
//     //   }}
//     //   onClick={onClick}
//     // >
//     {
//       /* <FaMapPin /> */
//     }
//     // {getPin(type)}
//     {
//       /* <path d={ICON} /> */
//     }
//     // </svg>
//     // );
//   }
// }
