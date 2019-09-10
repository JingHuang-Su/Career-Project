import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions';
import PostContent from './PostContent';
import CommentCard from './CommentCard';
import Comment from './Comment';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='post'>
        <div class='post__grid'>
          <PostContent post={post} />
          <Comment postId={post._id} />
          <div class='post__commentbox'>
            {post.comments.map(comment => (
              <CommentCard
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
