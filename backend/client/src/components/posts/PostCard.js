import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import sprite from '../img/sprite.svg';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions';

const PostCard = ({ addLike, removeLike, auth, vis, posts }) => {
  const [visibleData, setVisibleData] = useState({
    visible: 5
  });
  const { visible } = visibleData;

  const loadMore = () => {
    setVisibleData(() => {
      return { visible: vis + 4 };
    });
  };

  return (
    <Fragment>
      {posts.slice(0, visible).map(post => (
        <div className='posts__grid'>
          <div className='posts__criteria'>
            <button onClick={() => addLike(post._id)} type='button'>
              <svg>
                <use xlinkHref={`${sprite}#caret-arrow-up`} />
              </svg>
            </button>
            <span className='posts__criteria--num'>{post.likes.length}</span>
            <button onClick={() => removeLike(post._id)} type='button'>
              <svg>
                <use xlinkHref={`${sprite}#sort-down`} />
              </svg>
            </button>
          </div>

          <div className='posts__info'>
            <Link to={`/profiles/${post.user}`}>{post.name}</Link> 發表於{' '}
            <Moment format='YYYY/MM/DD'>{post.date}</Moment>
          </div>
          <div className='posts__important'>
            <div className='posts__important--category'>
              [{post.category}]{' '}
              <Link to={`/posts/${post._id}`}> {post.title}</Link>
            </div>
          </div>

          <div className='posts__comment'>
            <div className='posts__comment--icon'>
              <svg>
                <use xlinkHref={`${sprite}#chat`} />
              </svg>
            </div>
            <Link to={`/posts/${post._id}`}>
              <div className='posts__comment--num'>
                {post.comments.length} 則評論
              </div>
            </Link>
          </div>
        </div>
      ))}

      {visible < posts.length && (
        <button onClick={loadMore} type='button' className='btn'>
          Load more
        </button>
      )}
    </Fragment>
  );
};

//TODO:add delete post

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike }
)(PostCard);
