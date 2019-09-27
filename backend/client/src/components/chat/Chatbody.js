import React, { Fragment, useEffect, useState } from 'react';
// import openSocket from 'socket.io-client';
// import { getMsg } from '../../actions';
// import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Chatbody = ({ msg: { msg, loading }, id }) => {
  const [visibleData, setVisibleData] = useState({
    visible: 9
  });
  const { visible } = visibleData;

  // const loadMore = () => {
  //   setVisibleData({ visible: visible + 4 });
  // };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {msg.length > 0 && msg ? (
        msg.slice(msg.length - visible, msg.length).map(m => (
          <Fragment>
            {m.from === id ? (
              <p class='content__chat-you'>{m.body}</p>
            ) : (
              <p style={{ display: 'inline' }} class='content__chat-me'>
                {m.body}
              </p>
            )}
          </Fragment>
        ))
      ) : (
        <div>No Chat yet</div>
      )}
      {/* 
      {msg.length - visible > 0 && (
        <button onClick={loadMore} type='button' className='btn'>
          Load more
        </button>
      )} */}
    </Fragment>
  );
};
// const mapStateToProps = state => ({
//   msg: state.msg,
//   auth: state.auth
// });
// export default connect(
//     mapStateToProps,
//   { getMsg }
// )(Chatbody);

export default Chatbody;
