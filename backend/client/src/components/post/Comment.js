import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions';
import { Link } from 'react-router-dom';

const Comment = ({ postId, addComment }) => {
  const [formData, setFormData] = useState({
    text: ''
  });

  const { text } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addComment(postId, formData);
    setFormData('');
  };

  return (
    <Fragment>
      <form
        onSubmit={e => {
          onSubmit(e);
        }}
        className='form post__form'
      >
        <div className='form__group'>
          <textarea
            name='text'
            cols='10'
            rows='4'
            placeholder='內容'
            className='form__input'
            value={text}
            onChange={e => onChange(e)}
          ></textarea>
        </div>

        <div className='form__group mb-md'>
          <button type='submit' className='btn btn__login'>
            新增 &rarr;
          </button>
          <Link to='/posts' className='btn btn__login'>
            返回 &larr;
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

export default connect(
  null,
  { addComment }
)(Comment);
