import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import logo from '../img/logo1.png';

const Navbar = ({ auth: { isAuth, loading }, logout }) => {
  const guestlinks = (
    <ul className='navigation__list'>
      <li className='navigation__item'>
        <Link to='/posts' className='navigation__link'>
          文章
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/profiles' className='navigation__link'>
          開發者
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/signup' className='navigation__link'>
          註冊
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/login' className='navigation__link'>
          登入
        </Link>
      </li>
    </ul>
  );

  const authlinks = (
    <ul className='navigation__list'>
      <li className='navigation__item'>
        <Link to='/posts' className='navigation__link'>
          文章
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/profiles' className='navigation__link'>
          開發者
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/dashboard' className='navigation__link'>
          主控台
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/' onClick={logout} className='navigation__link'>
          登出
        </Link>
      </li>
    </ul>
  );
  return (
    <header className='header'>
      <Link to='/' className='navigation__link'>
        <img src={logo} alt='SYK logo' className='logo' />
      </Link>
      <nav className='navigation__nav'>
        {!loading && <Fragment>{isAuth ? authlinks : guestlinks}</Fragment>}
      </nav>
    </header>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
