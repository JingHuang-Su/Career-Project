import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import sprite from '../img/sprite.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSomething } from '../../actions';

const Experience = ({ authId, profileUserId, experience, deleteSomething }) => {
  const experiences = experience.map(exp => (
    <Fragment>
      <div className='profile__box'>
        <div className='profile__box--company'>{exp.title}</div>
        <div className='profile__box--date'>
          <Moment format='YYYY/MM/DD'>{moment.utc(exp.from)}</Moment> -{' '}
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format='YYYY/MM/DD'>{moment.utc(exp.to)}</Moment>
          )}
        </div>

        <div className='profile__box--major'>{exp.company}</div>
        <div className='profile__box--major'>{` ${exp.location}`}</div>

        <div className='profile__box--description'>
          <span>description:</span> {exp.description}
        </div>

        {profileUserId === authId && (
          <div className='profile__box--delete'>
            <span>
              <button
                onClick={() => {
                  deleteSomething('experience', exp._id);
                }}
              >
                <svg>
                  <use xlinkHref={`${sprite}#remove`}></use>
                </svg>{' '}
              </button>
            </span>
          </div>
        )}
      </div>
    </Fragment>
  ));
  //   TODO:Add Delete button
  return (
    experiences.length !== 0 && (
      <Fragment>
        <div className='profile__exp'>
          <div className='profile__title profile__dashboard'>
            工作經歷
            {profileUserId === authId && (
              <span>
                <Link
                  to='add-experience'
                  className='dashboard__buttons--button'
                >
                  <svg>
                    <use xlinkHref={`${sprite}#plus`}></use>
                  </svg>{' '}
                </Link>
              </span>
            )}
          </div>
          {experiences}
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  authId: state.auth.user._id,
  profileUserId: state.profile.profile.user._id
});
export default connect(
  mapStateToProps,
  { deleteSomething }
)(Experience);
