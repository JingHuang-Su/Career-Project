import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSomething } from '../../actions';

const AddEdu = ({ addSomething, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    major: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { school, degree, major, from, to, current, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addSomething('education', formData, history);
  };

  const [toDateDisabled, toggleDisabled] = useState(false);

  return (
    <Fragment>
      <section className='something'>
        <h2 className='something__title'>新增教育背景</h2>
        <p className='something__paragraph'>新增任何過去有過教育背景</p>
        <small className='something__required'>* = 必填</small>
        <form onSubmit={e => onSubmit(e)} className='form something__form'>
          <div className='form__group'>
            <input
              type='text'
              placeholder='* 學校'
              name='school'
              value={school}
              onChange={e => onChange(e)}
              required
              className='form__input'
              autocomplete='off'
            />
            <label for='name' className='form__label'>
              學校
            </label>
          </div>
          <div className='form__group'>
            <input
              type='text'
              placeholder='* 學位'
              value={degree}
              onChange={e => onChange(e)}
              name='degree'
              required
              className='form__input'
              autocomplete='off'
            />
            <label for='name' className='form__label'>
              學位
            </label>
          </div>
          <div className='form__group'>
            <input
              type='text'
              placeholder='主修'
              value={major}
              onChange={e => onChange(e)}
              name='major'
              className='form__input'
              autocomplete='off'
            />
            <label for='name' className='form__label'>
              主修
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
)(withRouter(AddEdu));
