import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import sprite from '../img/sprite.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSomething } from '../../actions';

const Education = ({ authId, profileUserId, education, deleteSomething }) => {
  const educations = education.map(edu => (
    <Fragment>
      <div className='profile__box'>
        <div className='profile__box--company'>{edu.school}</div>
        <div className='profile__box--date'>
          <Moment format='YYYY/MM/DD'>{moment.utc(edu.from)}</Moment> -{' '}
          {edu.to === null ? (
            ' Now'
          ) : (
            <Moment format='YYYY/MM/DD'>{moment.utc(edu.to)}</Moment>
          )}
        </div>

        <div className='profile__box--major'>
          {edu.degree},{` ${edu.major}`}
        </div>
        <div className='profile__box--description'>
          <span>description:</span> {edu.description}
        </div>

        {profileUserId === authId && (
          <div className='profile__box--delete'>
            <span>
              <button
                onClick={() => {
                  deleteSomething('education', edu._id);
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
    educations.length !== 0 && (
      <Fragment>
        <div className='profile__edu'>
          <div className='profile__title profile__dashboard'>
            教育背景
            {profileUserId === authId && (
              <span>
                <Link to='add-education' className='dashboard__buttons--button'>
                  <svg>
                    <use xlinkHref={`${sprite}#plus`}></use>
                  </svg>{' '}
                </Link>
              </span>
            )}
          </div>

          {educations}
          {/* {education.length > 0 ? (
            { educations }
          ) : (
            <div>新增教育背景，讓您的履歷更豐富</div>
          )} */}
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
)(Education);

// : (
//   <Fragment>
//     <div className='profile__edu'>
//       <div className='profile__title profile__dashboard'>
//         教育背景
//         <span>
//           <Link
//             to='add-education.html'
//             className='dashboard__buttons--button'
//           >
//             <svg>
//               <use xlinkHref={`${sprite}#plus`}></use>
//             </svg>{' '}
//           </Link>
//         </span>
//       </div>

//       <div>新增教育背景，讓您的履歷更豐富</div>
//     </div>
//   </Fragment>
// );
