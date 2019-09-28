import React from 'react';
import { FaTwitter } from 'react-icons/fa';

const PopupContent = (props) => {
  const metadata = props.info.properties;
  console.log(`|||metadata`, metadata);
  return (
    <div className='popup'>
      <p className='txt-h4'>{metadata.displayName || metadata.name}</p>
      <hr className='txt-hr' />
      {metadata.description && (
        <p className='txt-em mb6'>{metadata.description}</p>
      )}
      {metadata.twitterHandle && (
        <p className='txt-s mb6'>
          suggested by{' '}
          <a className='link' href=''>
            <FaTwitter />
            {metadata.twitterHandle}
          </a>
        </p>
      )}
    </div>
  );
};

export default PopupContent;

// export default class Info extends PureComponent {
//   render() {
//     const { info } = this.props;
//     const displayName = `${info.name}`;
//     const address = `${info.address}`;
//     console.log(`|||info`, info);
//     return (
//       <div className='popup'>
//         <div className='title'>{displayName}</div>
//         <div className='info'>{address}</div>
//       </div>
//     );
//   }
// }
