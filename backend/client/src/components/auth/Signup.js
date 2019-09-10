import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignup, setAlert } from '../../actions';
import login from '../img/login1.png';

const Signup = ({ isAuth, userSignup, setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { name, email, password, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    return password !== confirmPassword
      ? setAlert('密碼不一致', 'danger')
      : userSignup({ name, email, password });
  };

  if (isAuth) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <section className='login'>
        <div className='login_left'>
          <div className='login__form'>
            <form onSubmit={e => onSubmit(e)} className='form'>
              <div className='mb-md'>
                <h2 className='heading-secondary'>一起分享知識吧!</h2>
              </div>
              <div className='form__group'>
                <input
                  type='text'
                  className='form__input'
                  placeholder='使用者姓名'
                  value={name}
                  onChange={e => onChange(e)}
                  name='name'
                  required
                />
                <label for='name' className='form__label'>
                  使用者姓名
                </label>
              </div>
              <div className='form__group'>
                <input
                  type='email'
                  className='form__input'
                  placeholder='電子信箱'
                  name='email'
                  value={email}
                  onChange={e => onChange(e)}
                  autoComplete='off'
                  required
                />
                <label for='email' className='form__label'>
                  電子信箱
                </label>
              </div>
              <div className='form__group'>
                <input
                  type='password'
                  className='form__input'
                  placeholder='輸入密碼'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                  autoComplete='off'
                  required
                />
                <label for='password' className='form__label'>
                  輸入密碼
                </label>
              </div>
              <div className='form__group'>
                <input
                  type='password'
                  className='form__input'
                  placeholder='確認密碼'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={e => onChange(e)}
                  autoComplete='off'
                  required
                />
                <label for='confirmPassword' className='form__label'>
                  確認密碼
                </label>
              </div>
              <div className='form__group'>
                <button type='submit' className='btn btn__login'>
                  登入 &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='login_right'>
          <img src={login} alt='login' />
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});
export default connect(
  mapStateToProps,
  { userSignup, setAlert }
)(Signup);
