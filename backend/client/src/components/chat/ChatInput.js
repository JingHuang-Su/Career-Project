import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import sprite from '../img/sprite.svg';
import { postMsg } from '../../actions';

const ChatInput = ({ postMsg, receiverId }) => {
  const [formData, setFormData] = useState({
    msg: ''
  });

  const { msg } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    postMsg(formData, receiverId);
    setFormData({ msg: ' ' });
  };

  return (
    <Fragment>
      <form
        onSubmit={e => {
          onSubmit(e);
        }}
        class='type something__type content__msg-form'
      >
        <div class='content__msg-left'>
          <input
            placeholder='type ...'
            cols='5'
            rows='1'
            name='msg'
            class='type__input'
            autocomplete='off'
            value={msg}
            onChange={e => onChange(e)}
          />
        </div>
        <div class='content__msg-right'>
          <button type='submit'>
            <svg>
              <use xlinkHref={`${sprite}#right-arrow`}></use>
            </svg>
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default connect(
  null,
  { postMsg }
)(ChatInput);
