import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import sprite from '../img/sprite.svg';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions';

const PostContent = ({
  addLike,
  removeLike,
  post: { _id, title, name, user, date, likes, comments, category, text }
}) => {
  return (
    <Fragment>
      <div className='posts__info mb-sm'>
        <Link to={`/profiles/${user._id}`}>{name}</Link> 發表於{' '}
        <Moment format='YYYY/MM/DD'>{date}</Moment>
      </div>
      <div className='posts__important mb-sm'>
        <div className='posts__important--category'>
          [{category}] {title}
        </div>
      </div>
      <div className='post__paragraph'>
        <p>{text}</p>
      </div>

      <div className='posts__comment mt-sm mb-sm'>
        <div className='posts__comment--icon'>
          <svg>
            <use xlinkHref={`${sprite}#chat`} />
          </svg>
        </div>
        <div className='posts__comment--num'>{comments.length} 則評論</div>
        <button
          className='posts__comment--icon'
          onClick={() => addLike(_id, true)}
          type='button'
        >
          <svg>
            <use xlinkHref={`${sprite}#caret-arrow-up`} />
          </svg>
        </button>
        <span className='posts__criteria--num'>{likes.length}</span>
        <button
          className='posts__comment--icon'
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike }
)(PostContent);
