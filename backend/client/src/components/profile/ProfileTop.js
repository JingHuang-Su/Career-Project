import React, { Fragment, useEffect } from 'react';
import sprite from '../img/sprite.svg';
import { friendRequest, getFriends, getPendingFriends } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const ProfileTop = ({
  auth,
  receiverId,
  getPendingFriends,
  getFriends,
  friendRequest,
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar }
  },
  friends: { friends, pending, loading }
}) => {
  const onFriReq = () => {
    friendRequest(receiverId);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getPendingFriends(receiverId);
      await getFriends(receiverId);
    };
    fetchData();
  }, [getPendingFriends, getFriends, receiverId]);

  const isPending = pending.pendingfriends
    ? pending.pendingfriends.find(
        p => p.pendingData.id.toString() === auth.user._id
      )
    : false;

  const isFri = friends.friends
    ? friends.friends.find(f => f.friendData.id.toString() === auth.user._id)
    : false;

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='profile__intro'>
        <div class='profile__intro--addFriend'>
          {auth.isAuth &&
          auth.loading === false &&
          auth.user._id === receiverId ? (
            <Link to='/edit-profile'>&larr;Edit Profile </Link>
          ) : loading ? (
            <div>loading</div>
          ) : isPending ? (
            <div>等待回復</div>
          ) : isFri ? (
            <div>朋友</div>
          ) : (
            <button onClick={onFriReq}>好友邀請</button>
          )}
        </div>
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
const mapStateToProps = state => ({
  friends: state.friends
});
export default connect(
  mapStateToProps,
  { friendRequest, getPendingFriends, getFriends }
)(ProfileTop);
