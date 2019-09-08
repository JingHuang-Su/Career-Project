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
    <div class='post__content'>
      <figure class='post__content--shape'>
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          class='post__content--shape--img'
        />
        <figcaption class='post__content--shape--caption'>
          <Link to={`/profile/${user}`}>{name}</Link>
        </figcaption>
      </figure>
      <div class='post__content--text'>
        <h3 class='post__content--text--heading'>
          {name} 評論於 <Moment format='YYYY/MM/DD'>{date}</Moment>
        </h3>
        <p class='post__content--text--paragraph'>{text}</p>
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
