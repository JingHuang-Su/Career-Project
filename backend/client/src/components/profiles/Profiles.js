import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileCard from './ProfileCard';
import { getProfiles } from '../../actions';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section class='profiles'>
        <div class='profiles__boxes'>
          {profiles.length > 0 ? (
            profiles.map(profile => (
              <ProfileCard key={profile._id} profile={profile} />
            ))
          ) : (
            <h4>Noooooooooooooooo Profile found!!!!!!!</h4>
          )}
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
