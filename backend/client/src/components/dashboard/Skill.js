import React, { Fragment } from 'react';
import sprite from '../img/sprite.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteSomething, addCer } from '../../actions';

const Skill = ({
  authId,
  profileUserId,
  skill,
  deleteSomething,
  addCer,
  skills
}) => {
  console.log(skill);
  const skillsDomain = skill
    .filter(s => s.category === '產業知識')
    .map(s => (
      <Fragment>
        <div className='profile__skill'>
          <div className='profile__skill--name'>{s.skill}</div>
          <div className='profile__skill--cer'>{s.certificated.length}</div>
          {profileUserId === authId ? (
            <div className='profile__box--delete'>
              <span>
                <button
                  onClick={() => {
                    deleteSomething('skills', s._id);
                  }}
                >
                  <svg>
                    <use xlinkHref={`${sprite}#remove`}></use>
                  </svg>{' '}
                </button>
              </span>
            </div>
          ) : (
            <div className='profile__box--delete'>
              <span>
                <button
                  onClick={() => {
                    addCer(profileUserId, s._id, true);
                  }}
                >
                  <svg>
                    <use xlinkHref={`${sprite}#plus`}></use>
                  </svg>{' '}
                </button>
              </span>
            </div>
          )}
        </div>
      </Fragment>
    ));

  const skillsTool = skill
    .filter(s => s.category === '工具和科技')
    .map(s => (
      <Fragment>
        <div className='profile__skill'>
          <div className='profile__skill--name'>{s.skill}</div>
          <div className='profile__skill--cer'>{s.certificated.length}</div>
          {profileUserId === authId ? (
            <div className='profile__box--delete'>
              <span>
                <button
                  onClick={() => {
                    deleteSomething('skills', s._id);
                  }}
                >
                  <svg>
                    <use xlinkHref={`${sprite}#remove`}></use>
                  </svg>{' '}
                </button>
              </span>
            </div>
          ) : (
            <div className='profile__box--delete'>
              <span>
                <button
                  onClick={() => {
                    addCer(profileUserId, s._id, true);
                  }}
                >
                  <svg>
                    <use xlinkHref={`${sprite}#plus`}></use>
                  </svg>{' '}
                </button>
              </span>
            </div>
          )}
        </div>
      </Fragment>
    ));
  const skillsCommunicate = skill
    .filter(s => s.category === '人際交往')
    .map(s => (
      <Fragment>
        <div className='profile__skill'>
          <div className='profile__skill--name'>{s.skill}</div>
          <div className='profile__skill--cer'>{s.certificated.length}</div>
          {profileUserId === authId ? (
            <div className='profile__box--delete'>
              <span>
                <button
                  onClick={() => {
                    deleteSomething('skills', s._id);
                  }}
                >
                  <svg>
                    <use xlinkHref={`${sprite}#remove`}></use>
                  </svg>{' '}
                </button>
              </span>
            </div>
          ) : (
            <div className='profile__box--delete'>
              <span>
                <button
                  onClick={() => {
                    addCer(profileUserId, s._id, true);
                  }}
                >
                  <svg>
                    <use xlinkHref={`${sprite}#plus`}></use>
                  </svg>{' '}
                </button>
              </span>
            </div>
          )}
        </div>
      </Fragment>
    ));

  const skillsOther = skill
    .filter(s => s.category === '其他技能')
    .map(s => (
      <Fragment>
        <div className='profile__skill'>
          <div className='profile__skill--name'>{s.skill}</div>
          <div className='profile__skill--cer'>{s.certificated.length}</div>
          {profileUserId === authId ? (
            <div className='profile__box--delete'>
              <span>
                <button
                  onClick={() => {
                    deleteSomething('skills', s._id);
                  }}
                >
                  <svg>
                    <use xlinkHref={`${sprite}#remove`}></use>
                  </svg>{' '}
                </button>
              </span>
            </div>
          ) : (
            <div className='profile__box--delete'>
              <span>
                <button
                  onClick={() => {
                    addCer(profileUserId, s._id, true);
                  }}
                >
                  <svg>
                    <use xlinkHref={`${sprite}#plus`}></use>
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
    (skillsOther.length !== 0 ||
      skillsDomain.length !== 0 ||
      skillsCommunicate.length !== 0 ||
      skillsTool.length !== 0) && (
      <Fragment>
        <div className='profile__skills'>
          <div className='profile__title profile__dashboard'>
            技能
            {profileUserId === authId && (
              <span>
                <Link to='add-skill' className='dashboard__buttons--button'>
                  <svg>
                    <use xlinkHref={`${sprite}#plus`}></use>
                  </svg>{' '}
                </Link>
              </span>
            )}
          </div>
          {skillsDomain.length !== 0 && (
            <div className='profile__skills--domainknowledge'>
              <div className='profile__title--sub'>產業知識</div>
              <div className='profile__skills--box'>{skillsDomain}</div>
            </div>
          )}

          {skillsTool.length !== 0 && (
            <div className='profile__skills--toolstech'>
              <div className='profile__title--sub'>工具和科技</div>
              <div className='profile__skills--box'>{skillsTool}</div>
            </div>
          )}

          {skillsCommunicate.length !== 0 && (
            <div className='profile__skills--communicate'>
              <div className='profile__title--sub'>人際交往</div>

              <div className='profile__skills--box'>{skillsCommunicate}</div>
            </div>
          )}
          {skillsOther.length !== 0 && (
            <div className='profile__skills--others'>
              <div className='profile__title--sub'>其他技能</div>
              <div className='profile__skills--box'>{skillsOther}</div>
            </div>
          )}
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
  { deleteSomething, addCer }
)(Skill);

//   const trans = {
//     產業知識: 'domainknowledge',
//     工具和科技: 'toolstech',
//     人際交往: 'communicate',
//     其他技能: 'others'
//   }
// : (
//   <Fragment>
//   <div className='profile__other'>
//     <div className='profile__title profile__dashboard'>
//       其他經歷
//       <span>
//         <Link to='/add-other' className='dashboard__buttons--button'>
//           <svg>
//             <use xlinkHref={`${sprite}#plus`}></use>
//           </svg>{' '}
//         </Link>
//       </span>
//     </div>

//     <div>新增其他經歷，讓您的履歷更豐富</div>
//   </div>
// </Fragment>
