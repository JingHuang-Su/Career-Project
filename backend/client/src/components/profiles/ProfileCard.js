import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ profiles, vis }) => {
  const [visibleData, setVisibleData] = useState({ visible: 20 });
  const { visible } = visibleData;

  const loadMore = () => {
    setVisibleData(() => {
      return { visible: vis + 10 };
    });
  };
  return (
    <Fragment>
      {profiles.slice(0, visible).map(profile => (
        <div class='profiles__box'>
          <div class='profiles__box--background'></div>
          <div class='profiles__box--img'>
            <img src={profile.user.avatar} alt={profile.user.name} />
          </div>
          <div class='profiles__box--info'>
            <div class='profiles__box--info--name'>{profile.user.name}</div>
            <div class='profiles__box--info--workat'>
              {profile.status} at {profile.company}
            </div>
          </div>
          <div class='profiles__box--check'>
            <Link to={`/profiles/${profile.user._id}`}>深入了解 </Link>
          </div>
        </div>
      ))}
      {visible < profiles.length && (
        <button onClick={loadMore} type='button' className='btn'>
          Load more
        </button>
      )}
    </Fragment>
  );
};

export default ProfileCard;
