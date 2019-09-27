import React, { Fragment, useEffect, useState } from 'react';
import openSocket from 'socket.io-client';
import { getMsg, getFriends } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import Chatbody from './Chatbody';
import ChatInput from './ChatInput';

const Chat = ({ msg, match, getMsg }) => {
  useEffect(() => {
    const fetchData = async () => {
      getMsg(match.params.id);

      const socket = openSocket('http://localhost:5000');
      socket.on('message', data => {
        if (data.action === 'new') {
          getMsg(match.params.id);
        }
      });
    };
    fetchData();
  }, [getMsg, match.params.id]);
  return msg.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section class='chatroom'>
        <div class='sidebar'>
          <div class='sidebar__title'>
            Let's chat!!
            <div>{match.params.id}</div>
          </div>

          <div class='content__chat'>
            <Chatbody msg={msg} id={match.params.id} />
          </div>
          <div class='content__msg'>
            <ChatInput receiverId={match.params.id} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  msg: state.msg,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getMsg }
)(Chat);
