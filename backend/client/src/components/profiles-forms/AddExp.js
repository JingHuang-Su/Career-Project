import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSomething } from '../../actions';

const AddExp = ({ addSomething, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addSomething('experience', formData, history);
  };

  const [toDateDisabled, toggleDisabled] = useState(false);

  return (
    <Fragment>
      <section className='something'>
        <h2 className='something__title'>新增工作經歷</h2>
        <p className='something__paragraph'>新增任何過去有過的軟體開發經歷</p>
        <small className='something__required'>* = 必填</small>
        <form onSubmit={e => onSubmit(e)} className='form something__form'>
          <div className='form__group'>
            <select
              className='form__input'
              value={title}
              onChange={e => onChange(e)}
              name='title'
            >
              <option disabled selected value=''>
                * 選擇您的職稱
              </option>
              <option value='軟體開發人員'>軟體開發人員 (Developer)</option>
              <option value='資淺工程師'>資淺工程師 (Junior Developer)</option>
              <option value='資深工程師'>資深工程師 (Senior Developer)</option>
              <option value='經理'>經理 (Manager)</option>
              <option value='學生'>學生 (Student)</option>
              <option value='講師或教授'>
                講師或教授 (Instructor or Professor)
              </option>
              <option value='實習生'>實習生 (Intern)</option>
              <option value='其他'>其他 (Other)</option>
            </select>
          </div>
          <div className='form__group'>
            <input
              type='text'
              placeholder='* 公司'
              name='company'
              onChange={e => onChange(e)}
              value={company}
              required
              className='form__input'
              autoComplete='off'
            />
            <label for='name' className='form__label'>
              公司
            </label>
          </div>
          <div className='form__group'>
            <input
              type='text'
              placeholder='地點'
              name='location'
              onChange={e => onChange(e)}
              value={location}
              className='form__input'
              autoComplete='off'
            />
            <label for='name' className='form__label'>
              地點
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
)(withRouter(AddExp));
