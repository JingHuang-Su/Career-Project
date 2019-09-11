import React from 'react';

const ProfileAbout = ({ profile: { about } }) => {
  return (
    <div className='profile__bio'>
      <div className='profile__title'>簡介</div>
      <div className='profile__box'>
        <p className='profile__box--paragraph'>{about}</p>
      </div>
    </div>
  );
};

export default ProfileAbout;
