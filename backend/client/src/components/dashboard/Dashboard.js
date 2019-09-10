import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardAdd from './DashboardAdd';
import Education from './Education';
import Experience from './Experience';
import Others from './Others';
import Skill from './Skill';
import Certification from './Certification';
import { getCurrentProfile } from '../../actions';
const Dashboard = ({
  getCurrentProfile,
  auth,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div class='dashboard'>
        <div class='dashboard__header'>
          <h1 class='dashboard__header--title'>Dashboard</h1>
          <p class='dashboard__header--sayhi'>
            歡迎 {profile !== null && profile.user.name} !
          </p>
        </div>

        {profile !== null ? (
          <Fragment>
            <DashboardAdd profile={profile} auth={auth} />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <Skill skill={profile.skills} />
            <Others other={profile.others} />
            <Certification certification={profile.certification} />
          </Fragment>
        ) : (
          <Fragment>
            <p class='dashboard__header--title'>
              親愛的用戶您好，您還未建立任何資料，加緊腳步建立資料吧!!
            </p>
            <Link to='/create-profile' className='dashboard__buttons--button'>
              新增個人資訊 &larr;
            </Link>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
