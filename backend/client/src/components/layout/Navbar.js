import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions';
import logo from '../img/logo1.png';
import sprite from '../img/sprite.svg';

const Navbar = ({ auth, logout }) => {
  const guestlinks = (
    <ul className='navigation__list'>
      <li className='navigation__item'>
        <Link to='/profiles' className='user__nav--profile-link'>
          <svg>
            <use xlinkHref={`${sprite}#connection`} />
          </svg>
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/posts' className='user__nav--profile-link'>
          <svg>
            <use xlinkHref={`${sprite}#article`} />
          </svg>
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/signup' className='user__nav--profile-link'>
          <span>註冊</span>
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/login' className='user__nav--profile-link'>
          <span>登入</span>
        </Link>
      </li>
    </ul>
  );

  const authlinks = (
    <ul className='navigation__list'>
      <li className='navigation__item'>
        <Link to='/profiles' className='user__nav--profile-link'>
          <svg>
            <use xlinkHref={`${sprite}#connection`} />
          </svg>
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/posts' className='user__nav--profile-link'>
          <svg>
            <use xlinkHref={`${sprite}#article`} />
          </svg>
        </Link>
      </li>
      <li className='navigation__item'>
        <Link to='/notification' className='user__nav--profile-link'>
          <svg>
            <use xlinkHref={`${sprite}#notifications-bell-button`} />
          </svg>
        </Link>
      </li>
      <li className='navigation__item user__nav--user'>
        <Link to='/message' className='user__nav--profile-link'>
          <svg>
            <use xlinkHref={`${sprite}#chat-1`} />
          </svg>
        </Link>
        <div className='user__nav--profile'>
          <div className='user__nav--profile-chat'>
            <div className='user__nav--profile-who'>JingHuang-Su</div>
            <div className='user__nav--profile-text'>
              <span>Hello, How's going??</span>
            </div>
          </div>
          <div className='user__nav--profile-chat'>
            <div className='user__nav--profile-who'>Amy Liu</div>
            <div className='user__nav--profile-text'>
              <span>Yes, definitly true</span>
            </div>
          </div>

          <div className='user__nav--profile-center'>
            <Link to='/message'>更多</Link>
          </div>
        </div>
      </li>

      <li className='navigation__item user__nav--user'>
        <img
          src={auth.user ?  auth.user.avatar : <p>loading</p>}
          alt='photo'
          className='user__nav--user-photo'
        />

        <div className='user__nav--profile'>
          <ul className='user__nav--profile-list'>
            <li className='user__nav--profile-item'>
              <Link to='/dashboard' className='user__nav--profile-link'>
                <svg>
                  <use xlinkHref={`${sprite}#profile`} />
                </svg>
                <div>主控台</div>
              </Link>
            </li>
            <li className='user__nav--profile-item'>
              <Link
                to={auth.user ? `/friend/${auth.user._id}` : "/"}
                className='user__nav--profile-link'
              >
                <svg>
                  <use xlinkHref={`${sprite}#team`} />
                </svg>
                <div>朋友</div>
              </Link>
            </li>

            <li className='user__nav--profile-item'>
              <Link className='user__nav--profile-link' onClick={logout}>
                <svg>
                  <use
                    xlinkHref={`${sprite}#logout-or-send-square-with-right-arrow-interface-symbol`}
                  />
                </svg>
                <div>登出</div>
              </Link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
  return (
    <header className='header'>
      <Link to='/' className='navigation__link'>
        <img src={logo} alt='SYK logo' className='logo' />
      </Link>
      <nav className='navigation__nav'>
        {!auth.loading && (
          <Fragment>
            {auth.isAuth && auth.user ? authlinks : guestlinks}
          </Fragment>
        )}
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
