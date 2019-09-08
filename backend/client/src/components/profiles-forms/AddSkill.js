import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addSomething } from '../../actions';

const AddSkill = ({ addSomething, history }) => {
  const [formData, setFormData] = useState({
    category: '',
    skill: ''
  });

  const { category, skill } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addSomething('skills', formData, history);
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
            <select
              className='form__input'
              name='category'
              value={category}
              onChange={e => onChange(e)}
              required
            >
              <option disabled selected value=''>
                * 選擇技能種類
              </option>
              <option value='產業知識'>產業知識</option>
              <option value='工具和科技'>工具和科技</option>
              <option value='人際交往'>人際交往</option>
              <option value='其他'>其他技能</option>
            </select>
          </div>
          <div className='form__group'>
            <input
              type='text'
              placeholder='* 技能名稱'
              name='skill'
              required
              onChange={e => onChange(e)}
              value={skill}
              className='form__input'
              autocomplete='off'
            />
            <label for='name' className='form__label'>
              技能名稱
            </label>
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
)(withRouter(AddSkill));
