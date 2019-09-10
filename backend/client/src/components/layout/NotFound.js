import React, { Fragment } from 'react';
import login from '../img/login1.png';

const NotFound = () => {
  return (
    <Fragment>
      <section className='login'>
        <div className='login_left'>
          <h1>
            <strong>找不到此一頁面</strong>
          </h1>
        </div>
        <div className='login_right'>
          <img src={login} alt='login' />
        </div>
      </section>
    </Fragment>
  );
};

export default NotFound;
