import React, { Fragment, useEffect, useState } from 'react';

import {
  acceptOrRejectFriend,
  getFriends,
  getPendingFriends
} from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import FriendStatus from './FriendStatus';

const Friend = ({
  getPendingFriends,
  getFriends,
  acceptOrRejectFriend,
  auth,
  friends: { friends, pending, loading },
  match
}) => {
  // acceptOrRejectFriend(id, status)
  console.log(friends);
  const [buttonData, setButtonData] = useState({ category: 'friends' });
  const { category } = buttonData;

  useEffect(() => {
    const fetchData = async () => {
      if (category === 'friends') {
        await getFriends(match.params.id);
      } else if (category === 'pending') {
        await getPendingFriends(match.params.id);
      }
    };
    fetchData();
  }, [getPendingFriends, getFriends, match.params.id, category]);

  const onClick = e => {
    setButtonData({ category: e.target.value });
  };
  console.log(category);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section class='friend__list'>
        <div class='friend__list--title'>
          <div class='friend__list--friend'>
            <button onClick={e => onClick(e)} value='friends'>
              好友
            </button>
          </div>
          <div class='friend__list--pending'>
            <button onClick={e => onClick(e)} value='pending'>
              好友邀請
            </button>
          </div>
        </div>
        {!loading && category === 'friends' ? (
          <FriendStatus category={category} friendD={friends.friends} />
        ) : (
          <FriendStatus category={category} pendingD={pending} />
        )}
      </section>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  friends: state.friends,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { acceptOrRejectFriend, getPendingFriends, getFriends }
)(Friend);
