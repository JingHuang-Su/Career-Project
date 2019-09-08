import React from 'react';

const ProfileAbout = ({ profile: { about } }) => {
  return (
    <div class='profile__bio'>
      <div class='profile__title'>簡介</div>
      <div class='profile__box'>
        <p class='profile__box--paragraph'>{about}</p>
      </div>
    </div>
  );
};

export default ProfileAbout;
