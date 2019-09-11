import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import img1 from '../img/story--1.jpg';
import img2 from '../img/story--2.jpg';
import sprite from '../img/sprite.svg';

const Landing = ({ isAuth }) => {
  if (isAuth) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <section className='home'>
        <div className='home__box'>
          <h1 className='home__title--main'>加入我們，分享彼此的知識</h1>
          <h2 className='home__title--sub '>一起創造更多可能</h2>
          <button className='btn btn--animated home__btn mt-lg'>
            <a href='#down' style={{ textDecoration: 'none', color: 'black' }}>
              了解更多
            </a>
          </button>
        </div>
      </section>
      <section className='feature mt-lg' id='down'>
        <div className='feature__box'>
          <div className='feature__svg'>
            <svg>
              <use xlinkHref={`${sprite}#connection`} />
            </svg>
          </div>

          <h3 className='feature__text--header '>認識更多開發者</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, in
            mporibus recusandae ab excepturi?
          </p>
        </div>
        <div className='feature__box'>
          <div className='feature__svg'>
            <svg>
              <use xlinkHref={`${sprite}#application`} />
            </svg>
          </div>

          <h3 className='feature__text--header'>你的問題大家一起討論</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis !
          </p>
        </div>
        <div className='feature__box'>
          <div className='feature__svg'>
            <svg>
              <use xlinkHref={`${sprite}#goal`} />
            </svg>
          </div>

          <h3 className='feature__text--header'>達成自己設定的目標</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque</p>
        </div>
        <div className='feature__box'>
          <div className='feature__svg'>
            <svg>
              <use xlinkHref={`${sprite}#knowledge`} />
            </svg>
          </div>

          <h3 className='feature__text--header'>獲取更多有用的知識</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis .
          </p>
        </div>
      </section>
      <div className='story mt-lg'>
        <div className='story__top--img'>
          <img src={img2} alt='story 1' />
        </div>
        <div className='story__top--text'>
          <h1>想問問題或是想分享經驗</h1>
          <h2>這裡絕對是最適合您的地方</h2>
          <button className='btn'>
            <a href='/posts'> 看文章</a>
          </button>
        </div>

        <div className='story__down--img'>
          <img src={img1} alt='story 2' />
        </div>
        <div className='story__down--text'>
          <h1>想找人討論或是想結識開發者</h1>
          <h2>那就快點加入吧!!</h2>
          <button className='btn'>
            <a href='/profiles'> 開發者們</a>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

export default connect(
  mapStateToProps,
  null
)(Landing);
