import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import sprite from '../img/sprite.svg';
import { connect } from 'react-redux';
import { acceptOrRejectFriend } from '../../actions';

const FriendStatus = ({
  auth,
  friendD,
  pendingD,
  category,
  acceptOrRejectFriend
}) => {
  const [visibleData, setVisibleData] = useState({
    visible: 5
  });
  const { visible } = visibleData;

  const loadMore = () => {
    setVisibleData({ visible: visible + 4 });
  };
  console.log(friendD);
  console.log(pendingD);
  return category === 'friends' ? (
    <Fragment>
      {friendD.length > 0 && friendD ? (
        friendD.slice(0, visible).map(d => (
          <div class='friend__list--box'>
            <div class='friend__list--box--avatar'>
              <img src={`${d.friendData.avatar}`} alt='user1' />
            </div>
            <div class='friend__list--box--right'>
              <div class='friend__list--box--name'>{d.friendData.name}</div>
              <div class='friend__list--box--btnlist'>
                <div class='friend__list--box--btn1'>
                  <Link to={`/profiles/${d.friendData.id}`}>深入了解</Link>
                </div>
                <div class='friend__list--box--btn1'>
                  <Link to={`/message/${d.friendData.id}`}>聊天</Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No friends there</div>
      )}

      {visible < friendD.length && (
        <button onClick={loadMore} type='button' className='btn'>
          Load more
        </button>
      )}
    </Fragment>
  ) : (
    <Fragment>
      {pendingD.pendingfriends !== undefined &&
      pendingD.pendingfriends.length > 0 ? (
        pendingD.pendingfriends.slice(0, visible).map(p => (
          <div class='friend__list--box'>
            <div class='friend__list--box--avatar'>
              <img src={p.pendingData.avatar} alt='user1' />
            </div>
            <div class='friend__list--box--right'>
              <div class='friend__list--box--name'>{p.pendingData.name}</div>
              <div class='friend__list--box--btnlist'>
                <div class='friend__list--box--btn1'>
                  <button
                    onClick={() =>
                      acceptOrRejectFriend(p.pendingData.id, 'accept')
                    }
                  >
                    接受
                  </button>
                </div>
                <div class='friend__list--box--btn1'>
                  <button
                    onClick={() =>
                      acceptOrRejectFriend(p.pendingData.id, 'reject')
                    }
                  >
                    拒絕
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No pending friend there</div>
      )}

      {visible < pendingD.pendingfriends && (
        <button onClick={loadMore} type='button' className='btn'>
          Load more
        </button>
      )}
    </Fragment>
  );
};

export default connect(
  null,
  { acceptOrRejectFriend }
)(FriendStatus);
