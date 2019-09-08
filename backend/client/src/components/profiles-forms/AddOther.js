import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSomething } from '../../actions';

const AddOther = ({ addSomething, history }) => {
  const [formData, setFormData] = useState({
    otherName: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { otherName, from, to, current, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addSomething('others', formData, history);
  };

  const [toDateDisabled, toggleDisabled] = useState(false);

  return (
    <Fragment>
      <section className='something'>
        <h2 className='something__title'>新增其他經歷</h2>
        <p className='something__paragraph'>新增任何過去有過的其他重要經歷</p>
        <small className='something__required'>* = 必填</small>
        <form onSubmit={e => onSubmit(e)} className='form something__form'>
          <div className='form__group'>
            <input
              type='text'
              placeholder='* 其他經歷'
              name='otherName'
              required
              value={otherName}
              onChange={e => onChange(e)}
              className='form__input'
              autoComplete='off'
            />
            <label for='name' className='form__label'>
              其他經歷
            </label>
          </div>
          <div className='horizontal'>
            <div className='form__group'>
              <label for='name' className='form__text'>
                起始日
              </label>
              <input
                type='date'
                name='from'
                className='form__input'
                value={from}
                onChange={e => onChange(e)}
                required
              />
            </div>

            <div className='form__group'>
              <label for='name' className='form__text'>
                結束日
              </label>
              <input
                type='date'
                name='to'
                className='form__input'
                value={to}
                onChange={e => onChange(e)}
                disabled={toDateDisabled ? 'disabled' : ''}
              />
            </div>
            <div className='form__group horizontal__lastitem'>
              <div className='form__radio-group'>
                <input
                  type='checkbox'
                  className='form__radio-input'
                  id='large'
                  name='current'
                  value={current}
                  onChange={() => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                  }}
                />
                <label for='large' className='form__radio-label'>
                  <span className='form__radio-button'></span>
                  <p className='form__text'>迄今</p>
                </label>
              </div>
            </div>
          </div>
          <div className='form__group'>
            <textarea
              name='description'
              cols='15'
              rows='5'
              placeholder='經歷描述'
              className='form__input'
              value={description}
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
  { addSomething }
)(withRouter(AddOther));
