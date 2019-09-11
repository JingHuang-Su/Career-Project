import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const CommentCard = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth
}) => {
  return (
    <div className='post__content'>
      <figure className='post__content--shape'>
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className='post__content--shape--img'
        />
        <figcaption className='post__content--shape--caption'>
          <Link to={`/profiles/${user}`}>{name}</Link>
        </figcaption>
      </figure>
      <div className='post__content--text'>
        <h3 className='post__content--text--heading'>
          <Link to={`/profiles/${user}`}>{name}</Link> 評論於{' '}
          <Moment format='YYYY/MM/DD'>{date}</Moment>
        </h3>
        <p className='post__content--text--paragraph'>{text}</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  null
)(CommentCard);
//TODO: maybe add delete comment feature ...
