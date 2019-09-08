import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import Education from '../dashboard/Education';
import Experience from '../dashboard/Experience';
import Skill from '../dashboard/Skill';
import Others from '../dashboard/Others';
import Certification from '../dashboard/Certification';
import ProfileAbout from './ProfileAbout';
import ProfileTop from './ProfileTop';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {auth.isAuth &&
        auth.loading === false &&
        auth.user.id === profile.user._id && (
          <Link to='/edit-profile' className='btn'>
            &larr;Edit Profile{' '}
          </Link>
        )}

      <section class='profile'>
        <ProfileTop profile={profile} />
        {profile.about && <ProfileAbout profile={profile} />}
        <Experience experience={profile.experience} />
        <Education education={profile.education} />
        <Skill skill={profile.skills} />
        <Others other={profile.others} />
        <Certification certification={profile.certification} />
        {profile.githubusername && (
          <ProfileGithub username={profile.githubusername} />
        )}
      </section>
    </Fragment>
  );
};
const mapStatToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStatToProps,
  { getProfileById }
)(Profile);
