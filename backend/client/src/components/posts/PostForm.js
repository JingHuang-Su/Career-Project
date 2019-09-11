import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addPost } from '../../actions';

const PostForm = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    category: '',
    text: '',
    title: ''
  });

  const { text, title, category } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addPost(formData, history);
  };

  return (
    <Fragment>
      <section className='something'>
        <h2 className='something__title'>新增文章</h2>
        <small className='something__required'>* = 必填</small>
        <form
          onSubmit={e => {
            onSubmit(e);
          }}
          className='form something__form'
        >
          <div className='form__group'>
            <select
              className='form__input'
              value={category}
              onChange={e => onChange(e)}
              name='category'
            >
              <option disabled selected value=''>
                * 選擇類別
              </option>
              <option value='心得'>心得</option>
              <option value='請益'>請益 </option>
              <option value='閒聊'>閒聊 </option>
              <option value='新聞'>新聞 </option>
              <option value='問題'>問題 </option>
            </select>
          </div>
          <div className='form__group'>
            <input
              onChange={e => onChange(e)}
              value={title}
              type='text'
              placeholder='* 標題'
              name='title'
              required
              className='form__input'
              autocomplete='off'
            />
            <label for='name' className='form__label'>
              標題
            </label>
          </div>
          <div className='form__group'>
            <textarea
              name='text'
              cols='15'
              rows='20'
              placeholder='內容'
              className='form__input'
              value={text}
              onChange={e => onChange(e)}
            ></textarea>
          </div>

          <div className='form__group mt-sm'>
            <button type='submit' className='btn btn__login'>
              新增 &rarr;
            </button>
            <Link className='  btn btn__login mt-md' to='/dashboard'>
              回主頁
            </Link>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default connect(
  null,
  { addPost }
)(withRouter(PostForm));
