import React, { Fragment, useEffect } from 'react';
import openSocket from 'socket.io-client';

import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileCard from './ProfileCard';
import { getProfiles } from '../../actions';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
    const socket = openSocket('http://localhost:5000');
    socket.on('profile', data => {
      if (data.action === 'create') {
        getProfiles();
      }
    });
  }, [getProfiles]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='profiles'>
        <div className='profiles__boxes'>
          {profiles.length > 0 ? (
            <ProfileCard profiles={profiles} vis={20} />
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
