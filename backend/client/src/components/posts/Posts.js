import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostCard from './PostCard';
import { getPosts } from '../../actions';
import sprite from '../img/sprite.svg';

const Posts = ({ getPosts, posts: { posts, loading }, auth }) => {
  const [buttonData, setButtonData] = useState({ category: null });
  const { category } = buttonData;

  useEffect(() => {
    getPosts(category);
  }, [getPosts, category]);

  const onClick = e => {
    setButtonData({ category: e.target.value });
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='category mt-lg'>
        {auth.isAuth && (
          <div className='category__right'>
            <span>新增文章</span>
            <Link to='/post-form'>
              <svg>
                <use xlinkHref={`${sprite}#plus`}></use>
              </svg>
            </Link>
          </div>
        )}

        <div className='button__list category__left'>
          <button onClick={e => onClick(e)} value='' className='btn__all'>
            所有文章
          </button>
          <button
            onClick={e => onClick(e)}
            value='exp'
            className='btn__experience'
          >
            心得
          </button>
          <button
            onClick={e => onClick(e)}
            value='consult'
            className='btn__counsel'
          >
            請益
          </button>
          <button onClick={e => onClick(e)} value='talk' className='btn__talk'>
            閒聊
          </button>
          <button onClick={e => onClick(e)} value='news' className='btn__news'>
            新聞
          </button>
          <button
            onClick={e => onClick(e)}
            value='question'
            className='btn__question'
          >
            問題
          </button>
        </div>
      </section>

      <section className='posts'>
        <PostCard key={posts} posts={posts} />
      </section>
    </Fragment>
  );
};

//TODO: add feature of post comment

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.post
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
