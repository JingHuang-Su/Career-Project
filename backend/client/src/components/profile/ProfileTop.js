import React, { Fragment } from 'react';
import sprite from '../img/sprite.svg';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  }
}) => {
  return (
    <Fragment>
      <div className='profile__intro'>
        <div className='profile__intro--img'>
          <img src={avatar} alt={name} />
        </div>
        <h1 className='profile__intro--title'>{name}</h1>
        <p>
          <span> {status}</span> at <span>{company}</span>
        </p>
        <p>{location}</p>

        <div className='footer profile__iconslist mb-sm'>
          <ul className='footer__icons mb-sm'>
            {website && (
              <li className='profile__intro--website mb-sm'>
                <a href={website} target='_blank' rel='noopener noreferrer'>
                  W
                </a>
              </li>
            )}
            {social && social.medium && (
              <a href={social.medium} target='_blank' rel='noopener noreferrer'>
                <li>
                  <svg>
                    <use
                      xlinkHref={`${sprite}#medium`}
                      className='footer__icons--medium'
                    ></use>
                  </svg>
                </li>
              </a>
            )}
            {social && social.linkedin && (
              <a
                href={social.linkedin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <li>
                  <svg>
                    <use xlinkHref={`${sprite}#linkedin`}></use>
                  </svg>
                </li>
              </a>
            )}
            {social && social.twitter && (
              <a
                href={social.twitter}
                target='_blank'
                rel='noopener noreferrer'
              >
                <li>
                  <svg>
                    <use xlinkHref={`${sprite}#twitter`}></use>
                  </svg>
                </li>
              </a>
            )}
            {social && social.youtube && (
              <a
                href={social.youtube}
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                <li>
                  <svg>
                    <use xlinkHref={`${sprite}#youtube`}></use>
                  </svg>
                </li>
              </a>
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileTop;
