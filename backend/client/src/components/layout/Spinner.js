import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        height: '500px',
        width: '500px',
        margin: 'auto',
        display: 'block'
      }}
      alt='Loading...'
    />
  </Fragment>
);
