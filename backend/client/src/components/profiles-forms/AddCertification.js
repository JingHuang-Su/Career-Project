import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSomething } from '../../actions';

const AddCertification = ({ addSomething, history }) => {
  const [formData, setFormData] = useState({
    getDay: '',
    certificationName: ''
  });

  const { getDay, certificationName } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addSomething('certification', formData, history);
  };

  return (
    <Fragment>
      <section className='something'>
        <h2 className='something__title'>新增證照</h2>
        <p className='something__paragraph'>新增任何過去取得的證照</p>
        <small className='something__required'>* = 必填</small>
        <form
          onSubmit={e => {
            onSubmit(e);
          }}
          className='form something__form'
        >
          <div className='form__group'>
            <input
              onChange={e => onChange(e)}
              value={certificationName}
              type='text'
              placeholder='* 證照名稱 (ex. TOEIC 990, CPA)'
              name='certificationName'
              required
              className='form__input'
              autocomplete='off'
            />
            <label for='name' className='form__label'>
              證照名稱
            </label>
          </div>
          <div className='horizontal'>
            <div className='form__group'>
              <label for='name' className='form__text'>
                證照取得日
              </label>
              <input
                type='month'
                name='getDay'
                className='form__input'
                onChange={e => onChange(e)}
                value={getDay}
                required
              />
            </div>
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
)(withRouter(AddCertification));
