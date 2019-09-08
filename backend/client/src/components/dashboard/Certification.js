import React, { Fragment } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import sprite from '../img/sprite.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSomething } from '../../actions';

const Certification = ({
  authId,
  profileUserId,
  certification,
  deleteSomething
}) => {
  const certifications = certification.map(cer => (
    <Fragment>
      <div className='profile__cerbox'>
        <div className='profile__cerbox--name'>{cer.certificationName}</div>
        <div className='profile__cerbox--date'>
          <Moment format='YYYY/MM'>{moment.utc(cer.getDay)}</Moment>
        </div>
        {profileUserId === authId && (
          <div className='profile__box--delete'>
            <span>
              <button
                onClick={() => {
                  deleteSomething('certification', cer._id);
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
    certifications.length !== 0 && (
      <Fragment>
        <div className='profile__certification'>
          <div className='profile__certification--title profile__title  profile__dashboard'>
            證照
            {profileUserId === authId && (
              <span>
                <Link
                  to='add-certification'
                  className='dashboard__buttons--button'
                >
                  <svg>
                    <use xlinkHref={`${sprite}#plus`}></use>
                  </svg>{' '}
                </Link>
              </span>
            )}
          </div>
          <div className='profile__certification--outer'>{certifications}</div>
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
)(Certification);

// (
//   <Fragment>
//     <div className='profile__certification'>
//       <div className='profile__certification--title profile__title'>證照</div>
//       <span>
//         <Link to='/add-other' className='dashboard__buttons--button'>
//           <svg>
//             <use xlinkHref={`${sprite}#plus`}></use>
//           </svg>{' '}
//         </Link>
//       </span>

//       <div>新增其他經歷，讓您的履歷更豐富</div>
//     </div>
//   </Fragment>
// ) :
