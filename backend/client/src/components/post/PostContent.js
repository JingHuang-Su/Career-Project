import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import sprite from '../img/sprite.svg';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions';

const PostContent = ({
  addLike,
  removeLike,
  auth,
  post: { _id, title, name, user, date, likes, comments, category, text }
  // ,showActions
}) => {
  return (
    <Fragment>
      <div class='posts__info mb-sm'>
        <Link to='/profile'>{name}</Link> 發表於{' '}
        <Moment format='YYYY/MM/DD'>{date}</Moment>
      </div>
      <div class='posts__important mb-sm'>
        <div class='posts__important--category'>
          [{category}] <Link to='/post'> {title}</Link>
        </div>
      </div>
      <div class='post__paragraph'>
        <p>{text}</p>
      </div>

      <div class='posts__comment mt-sm mb-sm'>
        <div class='posts__comment--icon'>
          <svg>
            <use xlinkHref={`${sprite}#chat`} />
          </svg>
        </div>
        <Link to='/post'>
          <div class='posts__comment--num'>{comments.length} 則評論</div>
        </Link>
        <button
          class='posts__comment--icon'
          onClick={() => addLike(_id, true)}
          type='button'
        >
          <svg>
            <use xlinkHref={`${sprite}#caret-arrow-up`} />
          </svg>
        </button>
        <span class='posts__criteria--num'>{likes.length}</span>
        <button
          class='posts__comment--icon'
          onClick={() => removeLike(_id, true)}
          type='button'
        >
          <svg>
            <use xlinkHref={`${sprite}#sort-down`} />
          </svg>
        </button>
      </div>
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
)(PostContent);
