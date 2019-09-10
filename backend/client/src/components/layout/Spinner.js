import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    <div
      style={{
        margin: '200px',
        display: 'block',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          position: 'fixed',
          left: '0px',
          top: '50px',
          width: '100%',
          height: '100%',
          zIndex: '9999999999'
        }}
      >
        <img
          src={spinner}
          style={{
            width: '100px',
            margin: 'auto',
            display: 'block'
          }}
          alt='Loading...'
        />

        <strong>Please wait for loading </strong>
      </div>
    </div>
  </Fragment>
);
