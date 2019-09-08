import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company
  }
}) => {
  return (
    <div class='profiles__box'>
      <div class='profiles__box--background'></div>
      <div class='profiles__box--img'>
        <img src={avatar} alt={name} />
      </div>
      <div class='profiles__box--info'>
        <div class='profiles__box--info--name'>{name}</div>
        <div class='profiles__box--info--workat'>
          {status} at {company}
        </div>
      </div>
      <div class='profiles__box--check'>
        <Link to={`/profiles/${_id}`}>深入了解 </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
