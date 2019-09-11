import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import sprite from '../img/sprite.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSomething } from '../../actions';

const Others = ({ authId, profileUserId, other, deleteSomething }) => {
  const others = other.map(o => (
    <Fragment>
      <div className='profile__box'>
        <div className='profile__box--other'>{o.otherName}</div>
        <div className='profile__box--date'>
          <Moment format='YYYY/MM/DD'>{moment.utc(o.from)}</Moment> -{' '}
          {o.to === null ? (
            ' Now'
          ) : (
            <Moment format='YYYY/MM/DD'>{moment.utc(o.to)}</Moment>
          )}
        </div>

        <div className='profile__box--description'>
          <span>經歷描述:</span> {o.description}
        </div>

        {profileUserId === authId && (
          <div className='profile__box--delete'>
            <span>
              <button
                onClick={() => {
                  deleteSomething('others', o._id);
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
  //TODO:Add Delete button
  return (
    others.length !== 0 && (
      <Fragment>
        <div className='profile__other'>
          <div className='profile__title profile__dashboard'>
            其他經歷
            {profileUserId === authId && (
              <span>
                <Link to='add-other' className='dashboard__buttons--button'>
                  <svg>
                    <use xlinkHref={`${sprite}#plus`}></use>
                  </svg>{' '}
                </Link>
              </span>
            )}
          </div>
          {others}
        </div>
      </Fragment>
    )
  );
};

const mapStateToProps = state => ({
  authId: state.auth.user._id,
  profileUserId: state.profile.profile.user._id
});

export default connect(
  mapStateToProps,
  { deleteSomething }
)(Others);

// (
//   <Fragment>
//     <div className='profile__other'>
//       <div className='profile__title profile__dashboard'>
//         其他經歷
//         <span>
//           <Link to='/add-other' className='dashboard__buttons--button'>
//             <svg>
//               <use xlinkHref={`${sprite}#plus`}></use>
//             </svg>{' '}
//           </Link>
//         </span>
//       </div>

//       <div>新增其他經歷，讓您的履歷更豐富</div>
//     </div>
//   </Fragment>
// ) :
