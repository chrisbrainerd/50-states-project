import React, {PureComponent} from 'react';

export default class Info extends PureComponent {
  render() {
    const {info} = this.props;
    const displayName = `${info.name}`;
    const address = `${info.address}`;

    return (
      <div className='popup'>
        <div className='title'>{displayName}</div>
        <div className='info'>{address}</div>
      </div>
    );
  }
}
