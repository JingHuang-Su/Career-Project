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
      <section class='home'>
        <div class='home__box'>
          <h1 class='home__title--main'>加入我們，分享彼此的知識</h1>
          <h2 class='home__title--sub '>一起創造更多可能</h2>
          <button class='btn btn--animated home__btn mt-lg'>了解更多</button>
        </div>
      </section>
      <section class='feature mt-lg'>
        <div class='feature__box'>
          <div class='feature__svg'>
            <svg>
              <use xlinkHref={`${sprite}#connection`} />
            </svg>
          </div>

          <h3 class='feature__text--header '>認識更多開發者</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, in
            vitae consequatur saepe, cupiditate eum modi sit, vero ex inventore
            ipsum temporibus recusandae ab excepturi? Minima earum maxime ad
            error!
          </p>
        </div>
        <div class='feature__box'>
          <div class='feature__svg'>
            <svg>
              <use xlinkHref={`${sprite}#application`} />
            </svg>
          </div>

          <h3 class='feature__text--header'>你的問題大家一起討論</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            libero pariatur exercitationem, aliquid minima, vitae eos rem ipsum
            vel quasi doloribus, cupiditate in at! Illo, fuga atque. Quam, rem
            facilis!
          </p>
        </div>
        <div class='feature__box'>
          <div class='feature__svg'>
            <svg>
              <use xlinkHref={`${sprite}#goal`} />
            </svg>
          </div>

          <h3 class='feature__text--header'>達成自己設定的目標</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            accusantium et tenetur aperiam, harum quod repellendus ut debitis
            facere, perspiciatis delectus doloribus veritatis aut sed. Dolores
            illum incidunt velit soluta.
          </p>
        </div>
        <div class='feature__box'>
          <div class='feature__svg'>
            <svg>
              <use xlinkHref={`${sprite}#knowledge`} />
            </svg>
          </div>

          <h3 class='feature__text--header'>獲取更多有用的知識</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
            minima quam ad. Numquam ipsa unde, totam velit modi ipsum nulla sed
            sapiente repellat. Veniam sed quas laboriosam, sint voluptates quam.
          </p>
        </div>
      </section>
      <div class='story mt-lg'>
        <div class='story__top--img'>
          <img src={img2} alt='story 1' />
        </div>
        <div class='story__top--text'>
          <h1>想問問題或是想分享經驗</h1>
          <h2>這裡絕對是最適合您的地方</h2>
          <button class='btn'>
            <a href='posts.html'> 看文章</a>
          </button>
        </div>

        <div class='story__down--img'>
          <img src={img1} alt='story 2' />
        </div>
        <div class='story__down--text'>
          <h1>想找人討論或是想結識開發者</h1>
          <h2>那就快點加入吧!!</h2>
          <button class='btn'>
            <a href='profiles.html'> 開發者們</a>
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
