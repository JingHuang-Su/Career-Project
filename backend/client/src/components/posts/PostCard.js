import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import sprite from '../img/sprite.svg';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions';

const PostCard = ({
  addLike,
  removeLike,
  auth,
  post: { _id, title, name, user, date, likes, comments, category }
  // ,showActions
}) => {
  return (
    <Fragment>
      <div class='posts__grid'>
        <div class='posts__criteria'>
          <button onClick={() => addLike(_id)} type='button'>
            <svg>
              <use xlinkHref={`${sprite}#caret-arrow-up`} />
            </svg>
          </button>
          <span class='posts__criteria--num'>{likes.length}</span>
          <button onClick={() => removeLike(_id)} type='button'>
            <svg>
              <use xlinkHref={`${sprite}#sort-down`} />
            </svg>
          </button>
        </div>

        <div class='posts__info'>
          <Link to={`/profiles/${user}`}>{name}</Link> 發表於{' '}
          <Moment format='YYYY/MM/DD'>{date}</Moment>
        </div>
        <div class='posts__important'>
          <div class='posts__important--category'>
            [{category}] <Link to={`/posts/${_id}`}> {title}</Link>
          </div>
        </div>

        <div class='posts__comment'>
          <div class='posts__comment--icon'>
            <svg>
              <use xlinkHref={`${sprite}#chat`} />
            </svg>
          </div>
          <Link to={`/posts/${_id}`}>
            <div class='posts__comment--num'>{comments.length} 則評論</div>
          </Link>
        </div>
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
)(PostCard);
